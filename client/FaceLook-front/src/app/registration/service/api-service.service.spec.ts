import { TestBed } from "@angular/core/testing";
import { registrationApiService } from './api-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiConfigService } from '../../common/service/api-config.service';
import { Observable } from 'rxjs';
import { ISuccessResponse } from 'src/app/common/model/successResponse';

describe("postsFilterService", () => {
  let service: registrationApiService;
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  let apiConfigService: ApiConfigService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        registrationApiService,
        { provide: ApiConfigService, useClass: ApiConfigService }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(registrationApiService);
    httpClient = TestBed.get(HttpClient);
    apiConfigService = TestBed.get(ApiConfigService)
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("login() ApiRequest- test url,method and response are correct", (done: DoneFn) => {
    const { registrationUrl, login } = apiConfigService.registrationApi
    const url = registrationUrl + login
    const mockSuccessResponse: ISuccessResponse = { message: "success", token: "1214c3fvd3rcasc" }
    const reqOnservable = service.login({ email: "re@gwmail.com", password: '123456' })

    TestApi_REST_Request(reqOnservable, 'Post', url, mockSuccessResponse, done)
  });

  it("getResetCodePassword() ApiRequest- test url,method and response are correct", (done: DoneFn) => {
    const { registrationUrl, getResetCodePassword } = apiConfigService.registrationApi
    const url = registrationUrl + getResetCodePassword
    const mockSuccessResponse: ISuccessResponse = { message: "success" }
    const reqOnservable = service.getResetCodePassword("re@gwmail.com")

    TestApi_REST_Request(reqOnservable, 'patch', url, mockSuccessResponse, done)
  });

  it("getResetCodePassword() ApiRequest- test url,method and response are correct", (done: DoneFn) => {
    const { registrationUrl, verifyAccount } = apiConfigService.registrationApi
    const url = registrationUrl + verifyAccount
    const mockSuccessResponse: ISuccessResponse = { message: "success verify" }
    const reqOnservable = service.verifyAccount("1242342954nj5345nj")

    TestApi_REST_Request(reqOnservable, 'patch', url, mockSuccessResponse, done)
  });

  it("register() ApiRequest- test url,method and response are correct", (done: DoneFn) => {
    const { registrationUrl, register } = apiConfigService.registrationApi
    const url = registrationUrl + register
    const mockSuccessResponse: ISuccessResponse = { message: "success register" }
    const reqOnservable = service.register({ name: "ddd", email: "sss@sss.ss", password: 'wwwww' })

    TestApi_REST_Request(reqOnservable, 'post', url, mockSuccessResponse, done)
  });

  it("register() ApiRequest- test url,method and response are correct", (done: DoneFn) => {
    const { registrationUrl, forgetPassword } = apiConfigService.registrationApi
    const url = registrationUrl + forgetPassword
    const mockSuccessResponse: ISuccessResponse = { message: "success register" }
    const reqOnservable = service.updatePassword({ email: 'gggg@gg.gg', newPassword: 'gggg', confirmPassword: 'gggg' })

    TestApi_REST_Request(reqOnservable, 'patch', url, mockSuccessResponse, done)
  });

  function TestApi_REST_Request(requestObservable: Observable<any>, method: string, url: string, expectedResult: any, done: DoneFn) {
    requestObservable.subscribe(
      res => {
        expect(res).toEqual(expectedResult)
        done();
      }
    );

    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual(method.toUpperCase(), `request should be a ${method.toUpperCase()} Method`);
    request.flush(expectedResult);
  }

});

