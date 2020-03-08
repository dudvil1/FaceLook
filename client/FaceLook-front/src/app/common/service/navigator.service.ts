import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(private router: Router) { }

  goToRegister(){
    this.router.navigate(["register"])
  }
  goToLogin(){
    this.router.navigate(["login"])
  }
  goToHomePage(){
    this.router.navigate(["social"])
  }
  goToFriendsPage(){
    this.router.navigate(["friends"])
  }
  goToSharePostPage(){
    this.router.navigate(["sharePost"])
  }
  goToPostsPage(){
    this.router.navigate(["posts"])
  }
}
