import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { PostComponent } from '../post/post.component';
import { PostApiService } from '../../service/postApi.service';
import { PostsApiMockService } from '../../test/services/postApiMockService';
import { ApiConfigService } from '../../../common/service/api-config.service';
import { Subscription, of } from 'rxjs';
import { IPost } from 'src/app/common/model/post';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SocketService } from 'src/app/common/service/socket.service';
import { SocketMockService } from 'src/app/common/test/service/socketMockService';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postApi: PostsApiMockService
  let socketService: SocketService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostsComponent,
        PostComponent
      ],
      providers: [
        { provide: PostApiService, useClass: PostsApiMockService },
        { provide: SocketService, useClass: SocketMockService },
        { provide: ApiConfigService, useValue: { imageUrl: '' } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    postApi = TestBed.get(PostApiService);
    socketService = TestBed.get(SocketService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    postApi.getAllPosts()
      .subscribe(
        posts => expect(component.posts).toEqual(posts, 'on ngOnInit() component Posts should set post by result from postApiService ( getAllPost() )')
      )

    const subGet = postApi.getAllPosts()
      .subscribe(
        posts => component.posts = posts
      )
    expect(removeDestination(component.subscriptionGet)).toEqual(removeDestination(subGet))

  });

  it('on destroy subscriptionGet should unsubscribe', () => {
    const spySubscriptionGet = jasmine.createSpyObj('subscriptionGet', ['unsubscribe'])
    component.subscriptionGet = spySubscriptionGet
    component.ngOnDestroy()

    expect(spySubscriptionGet.unsubscribe.calls.count()).toEqual(1)
  });

  it('on destroy subscriptionGet should unsubscribe', () => {
    const spySubscriptionGet = jasmine.createSpyObj('subscriptionGet', ['unsubscribe'])
    component.subscriptionGet = spySubscriptionGet
    component.ngOnDestroy()

    expect(spySubscriptionGet.unsubscribe.calls.count()).toEqual(1)
  });

  it('setLikesOfPost() test method only work with post object as parameter', () => {
    updateLikesCallsCount(undefined, 0)
  });

  it('setLikesOfPost() test method with post as parameter call updateLikes() once', () => {
    updateLikesCallsCount(postApi.posts[0], 1)
  });

  it('setLikesOfPost() test method set subscriptionPost', () => {
    const post = postApi.posts[0]
    component.setLikesOfPost(post)
    const subPost = postApi.updateLikes(post).subscribe()
    expect(removeDestination(component.subscriptionPost)).toEqual(removeDestination(subPost))
  });

  it('Integration Test - child component emit post to add like', () => {

    let postChild: DebugElement = fixture.debugElement.query(
      By.directive(PostComponent));
      postChild.triggerEventHandler("likesEmitter",postApi.posts[1]);

      updateLikesCallsCount(postApi.posts[1],1)

  })

  function updateLikesCallsCount(post: IPost, expectedAmount) {
    const postApiSpy = jasmine.createSpyObj('postApiService', ['updateLikes'])
    postApiSpy.updateLikes.and.returnValue(of({}))

    component = new PostsComponent(postApiSpy,socketService)
    component.setLikesOfPost(post);
    expect(postApiSpy.updateLikes.calls.count()).toEqual(expectedAmount)
  }

  function removeDestination(sub: Subscription) {
    return {
      ...sub,
      destination: {}
    }
  }
});
