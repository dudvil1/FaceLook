import { Component, OnInit } from '@angular/core';
import { FriendApiService } from '../../service/friendApi.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users: any;
  searchQuery: string

  constructor(
    private userApiService: FriendApiService
  ) { }

  ngOnInit() {

  }

  searchUsers() {
    if (this.searchQuery && this.searchQuery.length > 1) {
      this.userApiService.getAllUsers(this.searchQuery).subscribe(
        users => {
          this.users = users}
      )
    }
  }

}
