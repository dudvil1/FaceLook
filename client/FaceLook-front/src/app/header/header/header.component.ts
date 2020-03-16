import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavigatorService } from '../../common/service/navigator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(
    private navigateService: NavigatorService
  ) { }

  ngOnInit(): void {
  }
  
  userLogout(){
    // this.api.logout();
    localStorage.removeItem("token");
    this.navigateService.goToLogin();
  }
  goToPosts(){
    this.navigateService.goToPostsPage();
  }
  goToSocial(){
    this.navigateService.goToHomePage();
  }
  goToFriends(){
    this.navigateService.goToFriendsPage();
  }
  goToSharePost(){
    this.navigateService.goToSharePostPage();
  }
  goToHomePage(){
    this.navigateService.goToHomePage();
  }
}
