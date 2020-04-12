import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterComponent } from "./register.component";
import { UserService } from "../../service/user-service.service";
import { registrationApiService } from "../../service/api-service.service";
import { NavigatorService } from "../../../common/service/navigator.service";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { RegistrationApiMockService } from '../../test/services/registrationApiMock';
import { NavigatorMockService } from 'src/app/common/test/service/navigatorMockService';
import { ToastrMockservice } from 'src/app/common/test/service/toastrMockService';
import { of, throwError } from 'rxjs';

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let navigatorService: NavigatorService;
  let RegistrationApiService: registrationApiService;
  let userService: UserService;
  let toastrService: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        FormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        UserService,
        { provide: registrationApiService, useClass: RegistrationApiMockService },
        { provide: ToastrService, useClass: ToastrMockservice },
        { provide: NavigatorService, useClass: NavigatorMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    //component services
    navigatorService = TestBed.get(NavigatorService);
    toastrService = TestBed.get(ToastrService);
    userService = TestBed.get(UserService);
    RegistrationApiService = TestBed.get(registrationApiService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ngOnInit() should call resetData()", () => {
    const spyUserService = jasmine.createSpyObj("UserService", ["resetData"]);

    component = new RegisterComponent(
      navigatorService,
      RegistrationApiService,
      spyUserService,
      toastrService
    );

    component.ngOnInit();

    expect(spyUserService.resetData.calls.count()).toBe(1, "resetData() from UserService Should be call once");
    expect(userService.userData).toEqual({});
  });

  it("register() should call api.register()", () => {
    const reqBody = userService.userData
    const spy = spyOn(RegistrationApiService, 'register').withArgs(reqBody).and.returnValue(of())
    component.register();

    expect(spy).toHaveBeenCalled()
  });

  it("register() - on api.register() success should call", () => {
    const spyToastrService = spyOn(toastrService, 'success')
    component.register();

    expect(spyToastrService).toHaveBeenCalled()
  });

  it("register() - on api.register() error should call", () => {
    const spyApiService = jasmine.createSpyObj("registrationApiService", ["register"]);
    const errorObservable = throwError({ error: { message: "err" } })
    spyApiService.register.and.returnValue(errorObservable)

    component = new RegisterComponent(
      navigatorService,
      spyApiService,
      userService,
      toastrService
    );

    const spyToastrService = spyOn(toastrService, 'error')
    component.register();

    expect(spyToastrService).toHaveBeenCalled()
  });
});
