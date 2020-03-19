import { Injectable } from '@angular/core';
import { IPost } from 'src/app/common/model/post';

interface IPostData{
  fromFilter?:string,
  ToFilter?:string,
  publisher?:string,
  radiusFrom?:number,
  location?:{
    latitude:number,
    longitude:number
  },
  imageTags?:any,
  userTags?:any,
}

@Injectable({
  providedIn: 'root'
})
export class postsFilterService {

  public postsData: IPostData = {};

  constructor() { }

  resetdata() {
    this.postsData = {};
  }

  isPostMatch(post: IPost): boolean {
    if (this.postsData.fromFilter && post.date < this.postsData.fromFilter) {
      return false
    }
    if (this.postsData.ToFilter && post.date > this.postsData.ToFilter) {
      return false
    }
    if (this.postsData.publisher && post.name && (post.name != this.postsData.publisher)) {
       return false
    }
    //TODO:
    if (this.postsData.radiusFrom && this.postsData.location) {
      // return false
    }
    if (this.postsData.imageTags) {
      // return false
    }
    if (this.postsData.userTags) {
      // return false
    }

    return true;
  }
}
