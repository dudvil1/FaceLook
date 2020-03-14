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

  it("should create", () => {
    const spyUserService = jasmine.createSpyObj("UserService", ["resetData"]);

    component = new RegisterComponent(
      navigatorService,
      RegistrationApiService,
      spyUserService,
      toastrService
    );

    component.ngOnInit();

    expect(spyUserService.resetData.calls.count()).toBe(1, "resetData() from UserService Should be call once");

    component = new RegisterComponent(
      navigatorService,
      RegistrationApiService,
      userService,
      toastrService
    );

    component.ngOnInit();
    expect(userService.userData).toEqual({});
  });
});
