import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header-inceptor';
import { PostApiService } from '../social/service/postApi.service';
import { ApiConfigService } from '../common/service/api-config.service';
import { StorageService } from '../common/service/storage.service';

describe(`AuthHttpInterceptor`, () => {
  let service: PostApiService;
  let apiConfig: ApiConfigService
  let storageService: StorageService
  let httpMock: HttpTestingController;

  let mockToken: string = "mockToken"

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiConfigService,
        PostApiService,
        StorageService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true,
        },
      ],
    });
    storageService = TestBed.get(StorageService)
    apiConfig = TestBed.get(ApiConfigService)
    service = TestBed.get(PostApiService);
    httpMock = TestBed.get(HttpTestingController);
    //defualt add token to storage
    storageService.setToken(mockToken)
  });

  it('should add an Authorization header when token exist', () => {
    const httpRequest = mockHttpReq()
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  });

  it('Authorization Should be JWT Scheme', () => {
    const httpRequest = mockHttpReq()
    expect(httpRequest.request.headers.get('Authorization')).toBe(`JWT ${mockToken}`)
  });

  it('should not add an Authorization header when token is not exist', () => {
    storageService.removeToken();
    const httpRequest = mockHttpReq()
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });

  function mockHttpReq(): TestRequest {
    const { socialUrl, getPosts } = apiConfig.socialApi
    service.getAllPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(socialUrl + getPosts);

    return httpRequest
  }
});