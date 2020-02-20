import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import {PostCollectionService} from "../service/post-collection.service"

@Injectable()
export  class postApiService {
  url = "http://localhost:3000/social/";

  constructor(
    private postService:PostCollectionService,
    private httpClient: HttpClient
    ) {}

  addPost(post: any) {
    console.log(post);
    return this.httpClient.post(this.url + "addPost",post);
  }

  getAllPosts(){
    return this.httpClient.get(this.url + "getPosts").toPromise()
    .then(collection => {
        this.postService.postCollections = collection as any[];
        console.log("collection",this.postService.postCollections);
    })
  }
}
