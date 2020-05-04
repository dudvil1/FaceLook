import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NavigatorService } from 'src/app/common/service/navigator.service';
import { NavigatorMockService } from 'src/app/common/test/service/navigatorMockService';
import { StorageService } from 'src/app/common/service/storage.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigatorService: NavigatorService
  let storageService: StorageService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        StorageService,
        { provide: NavigatorService, useClass: NavigatorMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    navigatorService = TestBed.get(NavigatorService)
    storageService = TestBed.get(StorageService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('userLogout() - test implementation', () => {
    createSpyOn(storageService,"removeToken")
    createSpyOn(navigatorService,"goToLogin")

    component.userLogout()

    expect(storageService.removeToken).toHaveBeenCalled()
    expect(navigatorService.goToLogin).toHaveBeenCalled()
  });

  it('goToPosts() - test implementation', () => {
    createSpyOn(navigatorService,"goToPostsPage")
    component.goToPosts()
    expect(navigatorService.goToPostsPage).toHaveBeenCalled()
  });

  it('goToSocial() - test implementation', () => {
    createSpyOn(navigatorService,"goToHomePage")
    component.goToSocial()
    expect(navigatorService.goToHomePage).toHaveBeenCalled()
  });

  it('goToSharePost() - test implementation', () => {
    createSpyOn(navigatorService,"goToSharePostPage")
    component.goToSharePost()
    expect(navigatorService.goToSharePostPage).toHaveBeenCalled()
  });

  it('goToPosts() - test implementation', () => {
    createSpyOn(navigatorService,"goToPostsPage")
    component.goToPosts()
    expect(navigatorService.goToPostsPage).toHaveBeenCalled()
  });

  it('goToFriends() - test implementation', () => {
    createSpyOn(navigatorService,"goToFriendsPage")
    component.goToFriends()
    expect(navigatorService.goToFriendsPage).toHaveBeenCalled()
  });

  it('goToHomePage() - test implementation', () => {
    createSpyOn(navigatorService,"goToHomePage")
    component.goToHomePage()
    expect(navigatorService.goToHomePage).toHaveBeenCalled()
  });

});

function createSpyOn(service, method: string) {
  return spyOn(service, method)
}
