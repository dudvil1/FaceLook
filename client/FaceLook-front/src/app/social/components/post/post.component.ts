import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from '../../../common/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: IPost;
  @Output() likesEmitter = new EventEmitter<IPost>();

  imgPath: string = 'http://localhost:3000/public/uploads/images/';

  likeClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.post)
  }

  
  addLike(post: IPost){
    if(this.likeClicked == false){
      this.post.likes++;
      this.likesEmitter.emit(post);
      this.likeClicked = true;
    } 
  }

}
