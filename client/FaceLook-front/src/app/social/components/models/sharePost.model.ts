import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class sharePostService {

  public sharePostsModel : any = {};

  constructor() { }

  resetdate(){
    this.sharePostsModel = {};
  }
}
