import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { PostApiService } from "../../service/postApi.service";
import { IPost } from '../../../common/model/post';
import { SocketService } from 'src/app/common/service/socket.service';
import { JwtService } from 'src/app/common/service/jwt.service';
import { markerCollectionsService } from '../../service/marker-collection.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: IPost[] = [];
  subscriptionGet: Subscription;
  subscriptionPost: Subscription;

  constructor(
    private postApiService: PostApiService,
    private markerCollection: markerCollectionsService,
    private jwtServiceHelper: JwtService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.subscriptionGet = this.markerCollection.allPost$.subscribe((posts) => this.posts = posts);
    this.postApiService.getAllPosts().subscribe()
  }


  ngOnDestroy() {
    this.subscriptionGet.unsubscribe();
  }

  setLikesOfPost(post: IPost) {
    if (post) {
      const data = { post: post, userId: this.jwtServiceHelper.getUserId() }
      const observableLike = post.likes.users.find(u => u == this.jwtServiceHelper.getUserId()) ?
        this.postApiService.removeLikes(data) :
        this.postApiService.updateLikes(data)

      this.subscriptionPost = observableLike.subscribe(
        (res) => {
          if (res.post) {
            const index = this.posts.indexOf(this.posts.find(p => p.postId == res.post.postId))
            this.posts[index] = res.post;
            this.socket.updateLike(res.post)
          }
        }
      )
    }
  }

}
