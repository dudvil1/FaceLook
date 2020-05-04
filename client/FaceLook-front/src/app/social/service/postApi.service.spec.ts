import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { ApiConfigService } from 'src/app/common/service/api-config.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/common/model/user';
import { JwtService } from '../../common/service/jwt.service';
import { markerCollectionsService } from './marker-collection.service';
import { PostApiService } from './postApi.service';
import { ISuccessResponse } from 'src/app/common/model/successResponse';
import { PostsApiMockService, postsMock } from '../test/services/postApiMockService';
import { IPost } from 'src/app/common/model/post';
import { Observable, combineLatest } from 'rxjs';


describe("PostApiService", () => {
  let service: PostApiService;
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  let apiConfigService: ApiConfigService
  let markerCollections: markerCollectionsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostApiService,
        { provide: ApiConfigService, useClass: ApiConfigService },
        { provide: markerCollectionsService, useClass: markerCollectionsService }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PostApiService);
    httpClient = TestBed.get(HttpClient);
    apiConfigService = TestBed.get(ApiConfigService)
    markerCollections = TestBed.get(markerCollectionsService)
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it('api request of #addPost : expected result', () => {
    const { socialUrl, addPost } = apiConfigService.socialApi

    const mockSuccessResponse: ISuccessResponse = { message: "success" }
    const postData = { name: '', date: new Date() }

    service.addPost(postData).subscribe(
      res => {
        expect(res).toEqual(mockSuccessResponse, 'expect to get a message that the post has been added to database')
      }
    );

    const request = httpTestingController.expectOne(socialUrl + addPost);
    expect(request.request.method).toEqual('POST', "addPost should be a Post Method");
    request.flush(mockSuccessResponse);
  });

  it('api request of #getAllPosts without markers :expected result', (done: DoneFn) => {
    const { socialUrl, getPosts } = apiConfigService.socialApi
    const request = service.getAllPosts()
    expectGetPosts(socialUrl + getPosts, request, false, done)
  });

  it('api request of #getAllPosts with markers :expected result', (done: DoneFn) => {
    const { socialUrl, getPosts } = apiConfigService.socialApi
    const request = service.getAllPosts(true)
    expectGetPosts(socialUrl + getPosts, request, true, done)
  });

  it('api request of #getFilterPosts with markers :expected result', (done: DoneFn) => {
    const { socialUrl, filterPosts } = apiConfigService.socialApi
    const filter = { tag: 'israel' }
    const request = service.getFilterPosts(filter)
    expectGetPosts(socialUrl + filterPosts(JSON.stringify(filter)), request, true, done)
  });

  it('api request of #updateLikes with markers :expected result', (done: DoneFn) => {
    const { socialUrl, addLike } = apiConfigService.socialApi
    const mockSuccessResponse: ISuccessResponse = { message: "SUCCESS" }
    const observ = service.updateLikes(<any>{});
    const expectedResult = (res) => {
      expect(res).toEqual(mockSuccessResponse, 'expect to get SUCCESS message')
      done()
    }
    expectHttpPatch(mockSuccessResponse, socialUrl + addLike, observ, expectedResult)
  });

  it('api request of #removeLikes with markers :expected result', (done: DoneFn) => {
    const { socialUrl, removeLike } = apiConfigService.socialApi
    const mockSuccessResponse: ISuccessResponse = { message: "SUCCESS" }
    const observ = service.removeLikes(<any>{});
    const expectedResult = (res) => {
      expect(res).toEqual(mockSuccessResponse, 'expect to get SUCCESS message')
      done()
    }
    expectHttpPatch(mockSuccessResponse, socialUrl + removeLike, observ, expectedResult)
  });


  function expectGetPosts(url: string, obs: Observable<any>, withMarker: boolean, done: DoneFn) {
    const mockSuccessResponse: IPost[] = postsMock
    const spyOnMarkers = spyOn(markerCollections.markers$, 'next')
    const expectedResult = (res) => {
      expect(res).toEqual(mockSuccessResponse, 'expect to get all posts')
      withMarker ? expect(spyOnMarkers).toHaveBeenCalled() : expect(spyOnMarkers).not.toHaveBeenCalled()
      done()
    }
    expectHttpGet(mockSuccessResponse, url, obs, expectedResult)
  }

  function expectHttpGet(response: any, url: string, obs: Observable<any>, expectCallback: (res?) => void) {
    obs.subscribe(expectCallback)
    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET', `${url} should be a Get Method`);
    request.flush(response);
  }

  function expectHttpPatch(response: any, url: string, obs: Observable<any>, expectCallback: (res?) => void) {
    obs.subscribe(expectCallback)
    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('PATCH', `${url} should be a PATCH Method`);
    request.flush(response);
  }
});
