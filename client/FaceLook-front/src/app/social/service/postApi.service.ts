import { Injectable } from "@angular/core";
import {
  HttpClient
} from "@angular/common/http";

@Injectable()
export  class postApiService {
  url = "http://localhost:3000/social/";

  constructor(private httpClient: HttpClient) {}

  addPost(post: any) {
    console.log(post);
    return this.httpClient.post(this.url + "addPost",post);
  }
}