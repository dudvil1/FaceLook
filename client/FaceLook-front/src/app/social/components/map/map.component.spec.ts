import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { LocationService } from 'src/app/common/service/locationService.service';
import { LocationMockService } from 'src/app/common/test/service/locationMockService';
import { GoogleMapsModule } from '@angular/google-maps';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { postsMock } from '../../test/services/postApiMockService';
import { IPost } from 'src/app/common/model/post';
import { CommentStmt } from '@angular/compiler';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let locationService: LocationService
  const mockObserPosts = new BehaviorSubject<IPost[]>(postsMock);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [
        GoogleMapsModule
      ],
      providers: [
        { provide: LocationService, useClass: LocationMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    locationService = TestBed.get(LocationService);
    component = fixture.componentInstance;
    component.markers = mockObserPosts
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on ngAfterViewInit() getUserCurrentLocation() has been called', () => {
    spyOn(component, 'getUserCurrentLocation');
    component.ngAfterViewInit()
    expect(component.getUserCurrentLocation).toHaveBeenCalled()
  });

  it('on getUserCurrentLocation() the user location will be det to #userCurrentLocation', (done) => {
    component.getUserCurrentLocation()

    locationService.getLocation().then(
      loc => {
        expect(component.userCurrentLocation).toEqual(loc)
        done()
      }
    )
  });

  it('myMap() a new map as been initialized', () => {
    component.userCurrentLocation = {
      lat: 31.799711,
      lng: 34.784820
    }
    spyOn(google.maps, "Map")

    component.myMap([])
    expect(google.maps.Map).toHaveBeenCalled()
  });
});
