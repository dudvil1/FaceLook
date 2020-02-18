import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData : any = {};

  constructor() { }

  resetData(){
    this.userData = {};
  }
}
