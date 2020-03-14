import { TestBed } from "@angular/core/testing";
import { sharePostService } from './sharePost.model';

describe("sharePostService", () => {
  let service: sharePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.inject(sharePostService);
  });


  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("resetdata() should reset sharePostsModel to empty object", () => {
    service.sharePostsModel = {
      id:"123",
      name:"post"
    }

    service.resetdata()
    expect(service.sharePostsModel).toEqual({},"sharePostsModel to be an empty object")
  });

  it("sharePostsModel to be ofType any", () => {
    expect(service.sharePostsModel).toBeInstanceOf(Object)
  });

});
