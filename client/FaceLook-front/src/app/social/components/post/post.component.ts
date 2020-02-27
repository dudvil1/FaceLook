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

  constructor() { }

  ngOnInit(): void {
    console.log(this.post)
  }

  
  addLike(post: any){
    // update THIS post likes
    // MAKE RESTRICTIONS HERE !!!!! 
    // 1. to click once only
    // 2. to check less than 0
    this.post.likes++;

    // include the new value of likes
    this.likesEmitter.emit(post);
    
  }

}
