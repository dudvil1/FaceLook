import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { ApiConfigService } from '../../../common/service/api-config.service';
import { IPost } from '../../../common/model/post';
import { postsMock } from '../../test/services/postApiMockService';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  let componentInputPost: IPost = postsMock[0]

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

  it('After addClick() method property-likeClicked should be true', () => {
    component.addLike(componentInputPost)
    expect(component.likeClicked).toBeTrue();
  });

});
