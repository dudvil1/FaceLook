import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavigatorService } from '../../common/service/navigator.service';
import { StorageService } from 'src/app/common/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(
    private navigateService: NavigatorService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
  }
  
  userLogout(){
    this.storageService.removeToken()
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
