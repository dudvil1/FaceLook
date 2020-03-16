import { TestBed } from "@angular/core/testing";
import { registrationApiService } from './api-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiConfigService } from '../../common/service/api-config.service';

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

});