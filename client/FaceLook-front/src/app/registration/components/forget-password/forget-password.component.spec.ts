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


describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgetPasswordComponent
      ],
      imports:[
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
