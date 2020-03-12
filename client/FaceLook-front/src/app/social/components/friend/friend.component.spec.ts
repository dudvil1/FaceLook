import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendComponent } from './friend.component';
import { FriendApiService } from '../../service/friendApi.service';
import { JwtMockService } from 'src/app/common/test/service/jwtMockService';
import { JwtService } from 'src/app/common/service/jwt.service';
import { FriendApiMockService } from '../../test/services/friendsApiMockService';
import { IUser } from '../../../common/model/user';

fdescribe('FriendComponent', () => {
  let component: FriendComponent;
  let fixture: ComponentFixture<FriendComponent>;
  let jwtMockService: JwtMockService
  let friendApiMockService: FriendApiMockService
  //current User Register
  const defualtUser: IUser = { _id: '1', active: true, role: 'user', email: 'guykem@gmail.com', name: 'guy' }
  //user  displayed by component
  const componentInputUser: IUser = { _id: '2', active: true, role: 'user', email: 'guykem1@gmail.com', name: 'guy1' }

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
    jwtMockService.setUser(defualtUser)
    friendApiMockService = TestBed.get(FriendApiService);

    fixture = TestBed.createComponent(FriendComponent);
    component = fixture.componentInstance;
    component.user = componentInputUser
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
