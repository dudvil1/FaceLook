import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { socialComponent } from './social.component';
import { markerCollectionsService } from './service/marker-collection.service';
import { PostApiService } from './service/postApi.service';
import { PostsApiMockService } from './test/services/postApiMockService';
import { SocketService } from '../common/service/socket.service';
import { SocketMockService } from '../common/test/service/socketMockService';
import { of } from 'rxjs';


describe('socialComponent', () => {
  let component: socialComponent;
  let fixture: ComponentFixture<socialComponent>;
  let markerCollections: markerCollectionsService
  let postApiService: PostApiService
  let socketService: SocketService

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
    markerCollections = TestBed.get(markerCollectionsService)
    postApiService = TestBed.get(PostApiService)
    socketService = TestBed.get(SocketService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on ngOnInit() should call getAllPosts() with true', () => {
    const spy = spyOn(postApiService, "getAllPosts").withArgs(true).and.returnValue(of())
    component.ngOnInit()
    expect(spy).toHaveBeenCalled()
  });

  it('on ngOnInit() marker should equal markerCollections.markers$ ', () => {
    component.ngOnInit()
    expect(component.markers).toBe(markerCollections.markers$)
  });


});
