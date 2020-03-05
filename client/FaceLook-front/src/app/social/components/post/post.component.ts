import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: any;
  @Output() likesEmitter = new EventEmitter<string>();

  imgPath: string = 'http://localhost:3000/public/uploads/images/';

  likeClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.post)
  }

  
  addLike(post: any){
    // likes = 0
    if(this.post.likes == 0 ) return;
    // if not clicked already
    if(this.likeClicked == false){
      // update THIS post likes
      this.post.likes++;
      // include the new value of likes
      this.likesEmitter.emit(post);
      this.likeClicked = true;
    } 
  }

}
