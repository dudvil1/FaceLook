import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsComponent } from './friends.component';
import { FriendApiService, IFriendApi } from '../../service/friendApi.service';
import { FriendApiMockService } from '../../test/services/friendsApiMockService';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  let friendsApi: IFriendApi

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FriendsComponent
      ],
      providers: [
        { provide: FriendApiService, useClass: FriendApiMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    friendsApi = TestBed.get(FriendApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searchUsers() method set users property to array of user that match the searchQuery by name or email', () => {
    const query = "guykem"

    component.searchQuery = query
    component.searchUsers()

    friendsApi.getAllUsers(component.searchQuery).subscribe(
      users => expect(component.users).toEqual([...users])
    )

  });
  it('searchUsers() method when the searchQuery(string) value is less then two characters, users is To Be Undefind', () => {
    component.searchQuery = "g"
    component.searchUsers()

    friendsApi.getAllUsers(component.searchQuery).subscribe(
      users => expect(component.users).toBeUndefined()
    )
  });
});
