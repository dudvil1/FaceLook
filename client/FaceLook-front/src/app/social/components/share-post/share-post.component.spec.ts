import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostComponent } from './share-post.component';
import { sharePostService } from '../../service/sharePost.model';
import { postApiService } from '../../service/postApi.service';
import { PostsApiMockService } from '../../test/services/postApiMockService';
import { ToastrService } from 'ngx-toastr';
import { ToastrMockservice } from 'src/app/common/test/service/toastrMockService';
import { NavigatorMockService } from 'src/app/common/test/service/navigatorMockService';
import { NavigatorService } from 'src/app/common/service/navigator.service';

describe('SharePostComponent', () => {
  let component: SharePostComponent;
  let fixture: ComponentFixture<SharePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SharePostComponent
      ],
      providers: [
        sharePostService,
        { provide: postApiService, useClass: PostsApiMockService },
        { provide: ToastrService, useClass: ToastrMockservice },
        { provide: NavigatorService, useClass: NavigatorMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
