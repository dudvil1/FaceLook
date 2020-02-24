import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";

@Injectable()
export  class postApiService {
  url = "http://localhost:3000/social/";

  constructor(
    private httpClient: HttpClient
    ) {}

  addPost(post: any) {
    return this.httpClient.post(this.url + "addPost", post);
  }

  getAllPosts(){
    return this.httpClient.get(this.url + "getPosts");
  }

  updateLikes(markerElm){
    return this.httpClient.patch(this.url + "updateLikes", {markerElm} );
  }
}
