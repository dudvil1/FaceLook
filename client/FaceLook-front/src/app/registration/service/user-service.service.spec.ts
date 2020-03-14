import { TestBed } from "@angular/core/testing";
import { UserService } from './user-service.service';

describe("postsFilterService", () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.inject(UserService);
  });


  it("should create", () => {
    expect(service).toBeTruthy();
  });

});