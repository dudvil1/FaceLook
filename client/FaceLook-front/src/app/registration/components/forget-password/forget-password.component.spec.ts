import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetPasswordComponent } from './forget-password.component';
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
import { of } from 'rxjs';


describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let navigatorService: NavigatorService
  let toastrService: ToastrService
  let registrationApi: registrationApiService
  let route: ActivatedRoute
  let userService: UserService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgetPasswordComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        UserService,
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: registrationApiService, useClass: RegistrationApiMockService },
        { provide: ToastrService, useClass: ToastrMockservice },
        { provide: NavigatorService, useClass: NavigatorMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    navigatorService = TestBed.get(NavigatorService)
    toastrService = TestBed.get(ToastrService)
    registrationApi = TestBed.get(registrationApiService)
    route = TestBed.get(ActivatedRoute)
    userService = TestBed.get(UserService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('confirmPassword() - return userData.newPassword EQUALS userData.confirmPassword', () => {
    userService.userData.newPassword = 'wrong1'
    userService.userData.confirmPassword = 'wrong2'
    expect(component.confirmPassword()).toBeFalsy('if newPassword doesnt equal confirmPassword ,confirmPassword() should return false')

    userService.userData.newPassword = 'right'
    userService.userData.confirmPassword = 'right'
    expect(component.confirmPassword()).toBeTruthy('if newPassword equal confirmPassword ,confirmPassword() should return true')
  });

  describe('forgetPassword() - requirements: 1.)confirmPassword() return true, 2.)route params has at least one Prop', () => {
    it('only confirmPassword() return true -should`nt call updatePassword', (done) => {
      spyOn(registrationApi, 'updatePassword')
      spyOn(component, 'confirmPassword').and.returnValue(true)
      component.forgetPassword()
      route.params.subscribe(() => {
        expect(registrationApi.updatePassword).not.toHaveBeenCalled()
        done()
      })
    });

    it('only route params has at least one Prop -should`nt call updatePassword', (done) => {
      spyOn(registrationApi, 'updatePassword')
      setRouteParams(route, { root: "dsdsd" })
      spyOn(component, 'confirmPassword').and.returnValue(false)
      component.forgetPassword()
      route.params.subscribe(() => {
        expect(registrationApi.updatePassword).not.toHaveBeenCalled()
        done()
      })
    });

    it('all requirements are met -SHOULD CALL updatePassword()', (done) => {
      spyOn(registrationApi, 'updatePassword').and.returnValue(of({ message: "Success" }))
      setRouteParams(route, { root: "dsdsd" })
      spyOn(component, 'confirmPassword').and.returnValue(true)
      component.forgetPassword()
      route.params.subscribe(() => {
        expect(registrationApi.updatePassword).toHaveBeenCalled()
        done()
      })
    });
  });

  it('integration Test - updatePassword From registrationApi Return Response (Implementation)', () => {
    const res = of({ message: "Success" })
    spyOn(registrationApi, 'updatePassword').and.returnValue(res)
    setRouteParams(route, { root: "dsdsd" })
    spyOn(component, 'confirmPassword').and.returnValue(true)

    spyOn(toastrService, 'success').withArgs("success to update your password")
    spyOn(navigatorService, 'goToLogin')
    component.forgetPassword()
    expect(toastrService.success).toHaveBeenCalled();
    expect(navigatorService.goToLogin).toHaveBeenCalled()
  });

});

function setRouteParams(route: ActivatedRoute, params: any) {
  try {
    (<any>route).setParams(params);
  } catch{

  }
}

