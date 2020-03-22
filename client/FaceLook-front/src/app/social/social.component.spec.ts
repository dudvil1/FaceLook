import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { socialComponent } from './social.component';
import { markerCollectionsService } from './service/marker-collection.service';
import { PostApiService } from './service/postApi.service';
import { PostsApiMockService } from './test/services/postApiMockService';
import { SocketService } from '../common/service/socket.service';
import { SocketMockService } from '../common/test/service/socketMockService';


describe('socialComponent', () => {
  let component: socialComponent;
  let fixture: ComponentFixture<socialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        socialComponent
      ],
      providers: [
        markerCollectionsService,
        { provide: PostApiService, useClass: PostsApiMockService },
        { provide: SocketService, useClass: SocketMockService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(socialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
