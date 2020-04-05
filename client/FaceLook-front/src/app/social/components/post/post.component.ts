import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from '../../../common/model/post';
import { ApiConfigService } from 'src/app/common/service/api-config.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: IPost;
  @Output() likesEmitter = new EventEmitter<IPost>();

  imgPath: string;

  likeClicked: boolean = false;

  constructor(private apiConfig: ApiConfigService) {
    this.imgPath = this.apiConfig.imageUrl
  }

  ngOnInit(): void {
  }


  addLike(post: IPost) {
    if (this.likeClicked == false) {
      this.likesEmitter.emit(post);
      this.likeClicked = true;
    }
  }

}
