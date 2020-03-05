import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams
} from "@angular/common/http";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class registrationApiService {
  url = "http://localhost:3000/registration/";

  constructor(private httpClient: HttpClient) {}

  login(user: any) {
    return this.httpClient.post(this.url + "login", user);
  }

  verifyAccount(params) {
    return this.httpClient.patch(this.url + "verifyAccount", params);
  }

  forgotPassword(user: any) {
    return this.httpClient.patch(this.url + "Forgot-Password", user);
  }

  register(user: any) {
    return this.httpClient.post(this.url + "register", user);
  }

}
