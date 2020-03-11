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
    private friendApiService: FriendApiService
  ) { }

  ngOnInit() {

  }

  searchUsers() {
    if (this.searchQuery && this.searchQuery.length > 1) {
      this.friendApiService.getAllUsers(this.searchQuery).subscribe(
        users => {this.users = users}
      )
    }
  }

}
