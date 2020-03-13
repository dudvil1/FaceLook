import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { FriendApiService } from './friendApi.service';
import { ApiConfigService } from 'src/app/common/service/api-config.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/common/model/user';
import { JwtService } from '../../common/service/jwt.service';
import { JwtMockService } from '../../common/test/service/jwtMockService';
import { FriendApiMockService } from '../test/services/friendsApiMockService';


describe("FriendApiService", () => {
  let service: FriendApiService;
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  let apiConfigService: ApiConfigService
  let jwtService: JwtService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FriendApiService,
        { provide: ApiConfigService, useClass: ApiConfigService },
        { provide: JwtService, useClass: JwtMockService }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(FriendApiService);
    httpClient = TestBed.get(HttpClient);
    apiConfigService = TestBed.get(ApiConfigService)
    jwtService = TestBed.get(JwtService)
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it('api request of #addFriend : expected result', () => {
    const { friendUrl, addFriend } = apiConfigService.friendApi

    const mockSuccessResponse: IUser = { _id: '123', active: true, email: 'guy@gmail.com', name: 'guy', role: '' }

    
    service.addFriend("123", mockSuccessResponse._id).subscribe(
      res => {
        expect(res).toEqual(mockSuccessResponse, 'expect to get the user new data')
      }
    );

    const request = httpTestingController.expectOne(friendUrl + addFriend);
    expect(request.request.method).toEqual('POST', "addFriend should be a Post Method");
    request.flush(mockSuccessResponse);
  });

  it('api request of #getAllUsers : expected result', () => {
    const { friendUrl, searchUsers } = apiConfigService.friendApi
    const data = { userId: jwtService.getUserId() }

    const users = new FriendApiMockService().users

    
    service.getAllUsers().subscribe(
      res => {
        expect(res).toEqual(users, 'expect to get list of all users')
      }
    );

    const request = httpTestingController.expectOne(friendUrl + searchUsers(JSON.stringify(data)));
    expect(request.request.method).toEqual('GET', "getAllUsers should be a Get Method");
    request.flush(users);
  });

  it('api request of #getAllUsers : expected result with filter', () => {
    const { friendUrl, searchUsers } = apiConfigService.friendApi
    const data = { filter: 'guy', userId: jwtService.getUserId() }

    const users = new FriendApiMockService().users

    
    service.getAllUsers(data.filter).subscribe(
      res => {
        expect(res).toEqual(users, 'expect to get list of all users')
      }
    );

    const request = httpTestingController.expectOne(friendUrl + searchUsers(JSON.stringify(data)));
    expect(request.request.method).toEqual('GET', "getAllUsers should be a Get Method");
    request.flush(users);
  });

  it('api request of #updateFollow : expected result with filter', () => {
    const { friendUrl, updateFollowFriend } = apiConfigService.friendApi
    const data = { filter: 'guy', userId: jwtService.getUserId() }

    const user = new FriendApiMockService().users[0]
    const friend = new FriendApiMockService().users[1]

    
    service.updateFollow(user._id,friend._id).subscribe(
      res => {
        expect(res).toEqual(friend, 'expect to get the user new data')
      }
    );

    const request = httpTestingController.expectOne(friendUrl + updateFollowFriend);
    expect(request.request.method).toEqual('POST', "updateFollow should be a Post Method");
    request.flush(friend);
  });

});
