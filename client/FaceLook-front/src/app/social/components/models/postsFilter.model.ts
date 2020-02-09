import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class postsFilterService {

  public postsData : any = {};

  constructor() { }

  resetdate(){
    this.postsData = {};
  }
}
