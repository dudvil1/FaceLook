import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { postApiService } from "../../service/postApi.service";
import { IPost } from '../../../common/model/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  posts: IPost[] = [];
  subscriptionGet: Subscription;
  subscriptionPost: Subscription;
  postIdEmmited: string;

  constructor(private postApiService: postApiService) { }
  
  ngOnInit(): void {
    this.subscriptionGet = this.postApiService.getAllPostsAsPosts()
      .subscribe((res)=>{
        this.posts = res;
    })
  }

  
  ngOnDestroy() {
    this.subscriptionGet.unsubscribe();
  }

  setLikesOfPost(post:IPost){
    if(post){
      this.subscriptionPost = this.postApiService.updateLikes(post)
      .subscribe((res)=>{
        console.log(res);
    })
    }
  }

}
