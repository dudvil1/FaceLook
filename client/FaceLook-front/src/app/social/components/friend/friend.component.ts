import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../common/model/user';
import { JwtService } from '../../../common/service/jwt.service';
import { FriendApiService } from '../../service/friendApi.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() user: any
  currentUser: IUser

  constructor(
    private jwtService: JwtService,
    private friendApiService: FriendApiService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.jwtService.getUser();
  }


  updateFollow(friendId) {
    this.friendApiService.updateFollow(this.currentUser._id, friendId).subscribe(
      user => {
        if (this.user._id == user._id)
          this.user = user
      }
    )
  }

  AddFriend(friendId) {
    this.friendApiService.addFriend(this.currentUser._id, friendId).subscribe(
      user => {
        if (this.user._id == user._id)
          this.user = user
      }
    )
  }
}
