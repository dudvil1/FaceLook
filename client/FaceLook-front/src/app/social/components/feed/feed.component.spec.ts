import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { LocationService } from 'src/app/common/service/locationService.service';
import { LocationMockService } from 'src/app/common/test/service/locationMockService';
import { PostApiService } from '../../service/postApi.service';
import { PostsApiMockService } from '../../test/services/postApiMockService';
import { postsFilterService } from '../../service/postsFilter.model';
import { FormsModule } from '@angular/forms';
import { of, from } from 'rxjs';
import { createSpy } from 'src/app/common/test/spy/spyService';
import { CommentStmt } from '@angular/compiler';
import { resolve } from 'dns';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let postApi: PostApiService
  let locationService: LocationService
  let postsFilter: postsFilterService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeedComponent
      ],
      imports: [
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
    postApi = TestBed.get(PostApiService);
    locationService = TestBed.get(LocationService);
    postsFilter = TestBed.get(postsFilterService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search method will not send request when the filter object doesnt have at least one property implemented', () => {
    const postApiSpy = createSpy(...[{ method: "getFilterPosts", returnValue: of({}) }])

    component = new FeedComponent(postsFilter, postApiSpy, locationService)
    component.search()
    expect(postApiSpy.getFilterPosts.calls.count()).toEqual(0, "should not send request when there is no filter option");
  });

  it('search method will send request when the filter object have at least one property implemented', () => {
    const postApiSpy = createSpy(...[{ method: "getFilterPosts", returnValue: of({}) }])

    component = new FeedComponent(postsFilter, postApiSpy, locationService)
    component.postsFilterService.postsData = {
      fromFilter: "2020-01-01"
    }
    component.search()
    expect(postApiSpy.getFilterPosts.calls.count()).toEqual(1, "should send request when there is filter option or options");
  });

  it('in search method call if in the filter object there is radius filter implmentation location will be addad from location service', (done) => {
    component.postsFilterService.postsData = {
      radiusFrom: 20
    }
    const location = {
      lat: 35,
      lng: 32
    }
    spyOn(locationService, "getLocation").and.returnValue(new Promise(resolve => resolve(location)))
    component.search().then(
      () => {
        expect(component.postsFilterService.postsData.location).toBeDefined()
        expect(component.postsFilterService.postsData.location).toEqual({ latitude: location.lat, longitude: location.lng })
        done()
      })
  });

});
