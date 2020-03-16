import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { LocationService } from 'src/app/common/service/locationService.service';
import { LocationMockService } from 'src/app/common/test/service/locationMockService';
import { PostApiService } from '../../service/postApi.service';
import { PostsApiMockService } from '../../test/services/postApiMockService';
import { postsFilterService } from '../../service/postsFilter.model';
import { FormsModule } from '@angular/forms';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeedComponent
      ],
      imports:[
        FormsModule
      ],
      providers: [
        { provide: LocationService, useClass: LocationMockService },
        { provide: PostApiService, useClass: PostsApiMockService },
        { provide: postsFilterService, useClass: postsFilterService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
