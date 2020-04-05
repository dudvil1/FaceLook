import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { LocationService } from 'src/app/common/service/locationService.service';
import { LocationMockService } from 'src/app/common/test/service/locationMockService';
import { GoogleMapsModule } from '@angular/google-maps';
import { of } from 'rxjs';
import { postsMock } from '../../test/services/postApiMockService';

fdescribe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let tempG

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
    component = fixture.componentInstance;
    component.markers = of(postsMock)
    fixture.detectChanges();
  });

  beforeEach(() => {
    if (google)
      tempG = google
  })

  afterAll(() => window.google = tempG)

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
