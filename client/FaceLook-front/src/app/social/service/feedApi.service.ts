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
export class feedApiService {
  url = "http://localhost:3000/social/";

  constructor(private httpClient: HttpClient) {}

  addPost(post: any) {
    console.log(post);
    return this.httpClient.post(this.url + "addPost",post);
  }
}
