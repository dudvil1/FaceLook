import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { postApiService } from "../../service/postApi.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  posts: any = [];
  subscription: Subscription;
  imgPath:string = 'http://localhost:3000/public/uploads/images/'; 


  constructor(private postApiService: postApiService) { }
  
  // @Input() posts;

  ngOnInit(): void {
    this.subscription = this.postApiService.getAllPostsAsPosts()
      .subscribe((res)=>{
        console.log("returned of result of postApiService.getAllPosts with the given postId, res ==> ");
        console.log(res);
        this.posts = res;
    })
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addLike(){
    console.log("addLike func");
  }

}
