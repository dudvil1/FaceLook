import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import {markerCollectionsService} from "../service/marker-collection.service"

@Injectable()
export  class postApiService {
  url = "http://localhost:3000/social/";

  constructor(
    private markersService:markerCollectionsService,
    private httpClient: HttpClient
    ) {}

  addPost(post: any) {
    return this.httpClient.post(this.url + "addPost", post);
  }

  getAllPosts(){
    return this.httpClient.get(this.url + "getPosts").toPromise()
    .then(collection => {
        this.markersService.markerCollections = collection as any[];
    })
  }

  updateLikes(markerElm){
    return this.httpClient.patch(this.url + "updateLikes", {markerElm} );
  }
}
