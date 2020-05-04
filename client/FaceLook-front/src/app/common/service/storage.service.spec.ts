import { TestBed } from "@angular/core/testing";
import { StorageService } from "./storage.service";
import { environment } from "../../../environments/environment";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.inject(StorageService);
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("setToken() should set the token recived to the local storage", () => {
    const token = "fake Token";

    service.setToken(token);
    expect(localStorage.getItem(environment.tokenKey)).toEqual(token);
  });

  it("getToken() should get the currect token from local storage", () => {
    const token = "fake Token";
    localStorage.setItem(environment.tokenKey,token)

    expect(localStorage.getItem(environment.tokenKey)).toEqual(service.getToken());
  });

  it("removeToken() should remove the token from local storage", () => {
    const token = "fake Token";
    localStorage.setItem(environment.tokenKey,token)

    expect(service.getToken()).toEqual(token);
    expect(service.removeToken()).toEqual(undefined);
  });
});
