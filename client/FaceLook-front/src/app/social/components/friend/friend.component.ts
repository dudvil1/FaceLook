import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/common/model/user';
import { JwtService } from 'src/app/common/service/jwt.service';
import { UserApiService } from '../../service/userApi.service';

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
    private userApiService: UserApiService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.jwtService.getUser();
  }


  updateFollow(friendId) {
    this.userApiService.updateFollow(this.currentUser._id,friendId).subscribe(
      user => {
        this.user = user
      }
    )
  }

  AddFriend(friendId) {
    this.userApiService.addFriend(this.currentUser._id,friendId).subscribe(
      user => {
        this.user = user
      }
    )
  }
}
