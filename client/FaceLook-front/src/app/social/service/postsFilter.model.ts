import { Injectable } from '@angular/core';
import { IPost } from 'src/app/common/model/post';

@Injectable({
  providedIn: 'root'
})
export class postsFilterService {

  public postsData: any = {};

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
    if (this.postsData.publisher) {
      // return post. <= this.postsData.fromFilter
    }
    if (this.postsData.radiusFrom && this.postsData.radiusFrom) {

    }
    if (this.postsData.imageTags) {
      
    }
    if (this.postsData.userTags) {

    }

    return true;
  }
}
