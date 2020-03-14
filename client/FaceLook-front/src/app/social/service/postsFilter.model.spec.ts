import { TestBed } from "@angular/core/testing";
import { postsFilterService } from './postsFilter.model';

describe("postsFilterService", () => {
  let service: postsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.inject(postsFilterService);
  });


  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("resetdata() should reset postsData to empty object", () => {
    service.postsData = {
      id:"123",
      name:"post"
    }

    service.resetdata()
    expect(service.postsData).toEqual({},"postsData to be an empty object")
  });

  it("postsData to be ofType any", () => {
    expect(service.postsData).toBeInstanceOf(Object)
  });
});