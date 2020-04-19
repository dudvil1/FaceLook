import { Injectable } from '@angular/core';
import { IPost } from 'src/app/common/model/post';

interface IPostData {
  fromFilter?: string,
  toFilter?: string,
  publisher?: string,
  radiusFrom?: number,
  location?: {
    latitude: number,
    longitude: number
  },
  imageTags: string[],
  userTags: string[],
}

@Injectable({
  providedIn: 'root'
})
export class postsFilterService {

  public postsData: IPostData = {
    imageTags: [],
    userTags: [],
  };

  constructor() { }

  resetdata() {
    this.postsData = {
      imageTags: [],
      userTags: [],
    };
  }

  isPostMatch(post: IPost): boolean {
    if (this.postsData.fromFilter && post.publishDate < new Date(this.postsData.fromFilter)) {
      return false
    }
    if (this.postsData.toFilter && post.publishDate > new Date(this.postsData.toFilter)) {
      return false
    }
    if (this.postsData.publisher && post.username && (post.username != this.postsData.publisher)) {
      return false
    }
    if (this.postsData.radiusFrom && this.postsData.location) {
      // return false
    }
    if (this.postsData.imageTags && this.postsData.imageTags.length > 0) {
      const found = post.image.tags.some(r => this.postsData.imageTags.indexOf(r) >= 0)
      if (!found)
        return false
    }
    if (this.postsData.userTags && this.postsData.userTags.length > 0) {
      const found = post.tags.some(r => this.postsData.userTags.indexOf(r) >= 0)
      if (!found)
        return false
    }

    return true;
  }
}
