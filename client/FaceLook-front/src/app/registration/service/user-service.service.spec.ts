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

  it("service initialization - userDate should be undefined", () => {
    expect(service.userData).toBeUndefined()
  });

  it("resetData() - reset the prop (userData) into empty Object", () => {
    service.userData = {
      name:"guy",
      email:"guy@gmail.com"
    }
    service.resetData()
    expect(service.userData).toEqual({},"userData should be an empty Object")
  });
});