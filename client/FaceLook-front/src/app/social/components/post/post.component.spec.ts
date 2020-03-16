import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { ApiConfigService } from '../../../common/service/api-config.service';
import { IPost } from '../../../common/model/post';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  let componentInputPost: IPost = {
    date: '2020-03-03', image: 'img.jpg', latitude: '35', likes: 10,
    longitude: '32', post_id: '1', publisher_id: '1', text: 'img', title: 'img1'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostComponent
      ],
      providers: [
        { provide: ApiConfigService, useValue: { imageUrl: "" } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = componentInputPost
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addClick() method should only trigger when property likeClicked is False', () => {
    component.likesEmitter = <any>jasmine.createSpyObj("likesEmitter", ['emit'])

    component.addLike(componentInputPost)
    component.addLike(componentInputPost)
    component.addLike(componentInputPost)
    component.addLike(componentInputPost)
    expect((<any>component.likesEmitter).emit.calls.count()).toEqual(1, "after one add user cannot like again")
  });

  it('addClick() method should add one like to post', () => {

    let oldLikesAmount = component.post.likes

    component.addLike(componentInputPost)
    expect((component.post.likes)).toEqual(++oldLikesAmount)
  });

  it('After addClick() method property-likeClicked should be true', () => {
    component.addLike(componentInputPost)
    expect(component.likeClicked).toBeTrue();
  });

});
