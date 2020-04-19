import { Injectable } from '@angular/core';

interface SharePostsModel {
  tags: string[],
  imageTags: string[],
  title: string,
  text: string
}
@Injectable({
  providedIn: 'root'
})
export class sharePostService {

  public sharePostsModel: SharePostsModel = {
    tags: [],
    imageTags: [],
    title: '',
    text: ''
  };

  constructor() { }

  resetdata() {
    this.sharePostsModel = {
      tags: [],
      imageTags: [],
      title: '',
      text: ''
    };
  }
}
