import { TestBed } from "@angular/core/testing";
import { markerCollectionsService } from './marker-collection.service';
import { Subject } from 'rxjs';

describe("postsFilterService", () => {
  let service: markerCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.inject(markerCollectionsService);
  });


  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("markers$ to be instance of subject", () => {
    expect(service.markers$).toBeInstanceOf(Subject)
  });
  it("markers$ to be Defined", () => {
    expect(service.markers$).toBeDefined()
  });

  it("allPost$ to be instance of subject", () => {
    expect(service.allPost$).toBeInstanceOf(Subject)
  });

  it("allPost$ to be Defined", () => {
    expect(service.allPost$).toBeDefined()
  });
});