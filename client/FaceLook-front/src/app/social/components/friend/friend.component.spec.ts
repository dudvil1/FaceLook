import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendComponent } from './friend.component';
import { FriendApiService, IFriendApi } from '../../service/friendApi.service';
import { JwtMockService } from 'src/app/common/test/service/jwtMockService';
import { JwtService } from 'src/app/common/service/jwt.service';
import { FriendApiMockService } from '../../test/services/friendsApiMockService';
import { IUser } from '../../../common/model/user';

describe('FriendComponent', () => {
  let component: FriendComponent;
  let fixture: ComponentFixture<FriendComponent>;
  let jwtMockService: JwtMockService
  const jwtSpyService: any = jasmine.createSpyObj('jwtService', ['getUserId', 'getUser'])
  let friendApiMockService: FriendApiMockService

  //current User Register
  let currentUser: IUser = { _id: '1', active: true, role: 'user', email: 'guykem@gmail.com', name: 'guy' }
  //user  displayed by component
  let componentInputUser: IUser = { _id: '2', active: true, role: 'user', email: 'guykem1@gmail.com', name: 'guy1' }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FriendComponent],
      providers: [
        { provide: JwtService, useClass: JwtMockService },
        { provide: FriendApiService, useClass: FriendApiMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    jwtMockService = TestBed.get(JwtService);
    jwtMockService.setUser(currentUser)
    friendApiMockService = TestBed.get(FriendApiService);

    fixture = TestBed.createComponent(FriendComponent);
    component = fixture.componentInstance;
    component.user = componentInputUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() method test jwtService getUser() with spy service', () => {
    component = new FriendComponent(jwtSpyService, <any>friendApiMockService)
    const getUserStub = currentUser

    jwtSpyService.getUser.and.returnValue(getUserStub)

    component.ngOnInit()

    expect(jwtSpyService.getUser.calls.count()).toBe(1, "getUser() should be called once")
    expect(component.currentUser).toEqual(getUserStub, "getUser() should return current user")
  });

  it('updateFollow() method test user (@input) is override with new User', () => {

    testUpdateFollow(componentInputUser)
    testUpdateFollow(friendApiMockService.users[2])

    function testUpdateFollow(friend: IUser) {
      component.updateFollow(friend._id)

      friendApiMockService.updateFollow(currentUser._id, friend._id).subscribe(
        resultUserFromServer => {
          //if is the same user by id we can override
          if (component.user._id == resultUserFromServer._id) {
            expect(component.user).toEqual(resultUserFromServer)
          } else {
            expect(component.user != resultUserFromServer).toBeTruthy('should`nt ovveride when the user is not the same user as at the start')
          }
        }
      )
    }
  });

  it('addFriend() method test user (@input) is override with new User', () => {

    testAddFriend(componentInputUser)
    testAddFriend(friendApiMockService.users[2])

    function testAddFriend(friend: IUser) {
      component.AddFriend(friend._id)

      friendApiMockService.addFriend(currentUser._id, friend._id).subscribe(
        resultUserFromServer => {
          //if is the same user by id we can override
          if (component.user._id == resultUserFromServer._id) {
            expect(component.user).toEqual(resultUserFromServer)
          } else {
            expect(component.user != resultUserFromServer).toBeTruthy('should`nt ovveride when the user is not the same user as at the start')
          }
        }
      )
    }
  });

});
