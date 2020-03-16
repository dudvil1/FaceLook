import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { PostApiService } from "../../service/postApi.service";
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

  constructor(private postApiService: PostApiService) { }

  ngOnInit(): void {
    this.subscriptionGet = this.postApiService.getAllPosts()
      .subscribe((res) => {
        this.posts = res;
      })
  }


  ngOnDestroy() {
    this.subscriptionGet.unsubscribe();
  }

  setLikesOfPost(post: IPost) {
    if (post) {
      this.subscriptionPost = this.postApiService.updateLikes(post).subscribe()
    }
  }

}
