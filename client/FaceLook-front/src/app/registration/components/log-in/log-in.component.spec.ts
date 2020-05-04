import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../service/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { registrationApiService } from '../../service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NavigatorService } from '../../../common/service/navigator.service';
import { NavigatorMockService } from '../../../common/test/service/navigatorMockService';
import { ToastrMockservice } from '../../../common/test/service/toastrMockService';
import { RegistrationApiMockService } from '../../test/services/registrationApiMock';
import { ActivatedRouteMock } from '../../../common/test/service/activatedRouteMock';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in.component';
import { createSpy } from 'src/app/common/test/spy/spyService';
import { StorageService } from 'src/app/common/service/storage.service';
import { of, throwError } from 'rxjs';
import { ISuccessResponse } from 'src/app/common/model/successResponse';
import { ifError } from 'assert';
import { writeHeapSnapshot } from 'v8';
import { CommentStmt } from '@angular/compiler';


describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let navigatorService: NavigatorService
  let toastrService: ToastrService
  let registrationApi: registrationApiService
  let route: ActivatedRoute
  let userService: UserService
  let storageService: StorageService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogInComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        UserService,
        StorageService,
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: registrationApiService, useClass: RegistrationApiMockService },
        { provide: ToastrService, useClass: ToastrMockservice },
        { provide: NavigatorService, useClass: NavigatorMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    navigatorService = TestBed.get(NavigatorService)
    toastrService = TestBed.get(ToastrService)
    registrationApi = TestBed.get(registrationApiService)
    route = TestBed.get(ActivatedRoute)
    userService = TestBed.get(UserService)
    storageService = TestBed.get(StorageService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call verifyAccountIfNecessary() method', () => {
    spyOn(component, "verifyAccountIfNecessary")
    component.ngOnInit()
    expect(component.verifyAccountIfNecessary).toHaveBeenCalled()
  });

  it('ngOnInit should call resetData() from userService', () => {
    const spy = createSpy({ method: "resetData" })
    component = new LogInComponent(navigatorService, registrationApi, spy, toastrService, storageService, route)
    component.ngOnInit()
    expect(spy.resetData.calls.count()).toEqual(1)
  });

  it('login should call login() from RegistartionApiService', () => {
    const res = registrationApi.login(component.userService.userData)
    const registrationApiSpy = createSpy({ method: "login", returnValue: res })
    component = new LogInComponent(navigatorService, registrationApiSpy, userService, toastrService, storageService, route)
    component.login()
    expect(registrationApiSpy.login.calls.count()).toEqual(1)
  });

  it('integration Test - test login success implementation', () => {
    //response success
    const res: ISuccessResponse = { message: "Success", token: "123523cws342fr4fwdvw4523ddvwe5qs" }
    const registrationApiSpy = createSpy({ method: "login", returnValue: of(res) })
    spyOn(storageService, 'setToken').withArgs(res.token)
    spyOn(toastrService, "success").withArgs(res.message, "Success")
    spyOn(navigatorService, "goToHomePage")
    component = new LogInComponent(navigatorService, registrationApiSpy, userService, toastrService,
      storageService, route)
    component.login()
    expect(storageService.setToken).toHaveBeenCalled()
    expect(toastrService.success).toHaveBeenCalled()
    expect(navigatorService.goToHomePage).toHaveBeenCalled()
  });

  it('integration Test - test login error implementation', () => {
    //response error
    const registrationApiSpy = createSpy({ method: "login", returnValue: throwError(new Error()) })
    spyOn(toastrService, "error")
    component = new LogInComponent(navigatorService, registrationApiSpy, userService, toastrService,
      storageService, route)
    component.login()
    expect(toastrService.error).toHaveBeenCalled()
  });

  it('verifyAccountIfNecessary() - when params exist should call verifyAccount() in registrationApiService', () => {
    setRouteParams(route, "1214ddr4fcs");
    spyOn(registrationApi, 'verifyAccount').and.returnValue(of({message:"success"}))
    component.verifyAccountIfNecessary()
    expect(registrationApi.verifyAccount).toHaveBeenCalled()
  });

  it('verifyAccount() - on success response', () => {
    setRouteParams(route, "1214ddr4fcs");

    const msg = "success verify"
    spyOn(registrationApi, 'verifyAccount').and.returnValue(of({ message: msg }))
    spyOn(toastrService, 'success').withArgs(msg)
    component.verifyAccountIfNecessary()
    expect(toastrService.success).toHaveBeenCalled()
  });

  it('verifyAccount() - on success response', () => {
    setRouteParams(route, "1214ddr4fcs");

    spyOn(registrationApi, 'verifyAccount').and.returnValue(throwError(new Error()))
    spyOn(toastrService, 'error')
    component.verifyAccountIfNecessary()
    expect(toastrService.error).toHaveBeenCalled()
  });

  it('onForgotPassword() - when email input not set,alert User ', () => {
    spyOn(window, "alert").withArgs("Enter Your Email First")
    component.onForgotPassword();
    expect(window.alert).toHaveBeenCalled()
  });

  it('onForgotPassword() - when email input set,call getResetCodePassword()', () => {
    component.userService.userData.email = "guykem@ddddd.com"
    spyOn(registrationApi, "getResetCodePassword").and.returnValue(of({ message: "success" }))
    component.onForgotPassword();
    expect(registrationApi.getResetCodePassword).toHaveBeenCalled()
  });

  it('onForgotPassword() - when email input set , call getResetCodePassword() and return success', () => {
    const email = 'guy@gmail.com'
    component.userService.userData.email = email
    spyOn(toastrService, 'success').withArgs("Reset Code just send to your email")
    component.onForgotPassword();
    expect(toastrService.success).toHaveBeenCalled()
  });

  it('onForgotPassword() - when email input set , call getResetCodePassword() and return error', () => {
    const email = 'guy@gmail.com'
    component.userService.userData.email = email
    spyOn(registrationApi, "getResetCodePassword").and
      .returnValue(throwError(new Error))
    spyOn(toastrService, 'error').withArgs("please try again")
    component.onForgotPassword();
    expect(toastrService.error).toHaveBeenCalled()
  });

  it('goToRegisterPage() - call goToRegister() from navigateService', () => {
    spyOn(navigatorService, 'goToRegister')
    component.goToRegisterPage();
    expect(navigatorService.goToRegister).toHaveBeenCalled()
  });

});

function setRouteParams(route: ActivatedRoute, params: any) {
  (<any>route).setParams(params);
}

