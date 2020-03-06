import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/common/model/user';
import { JwtService } from 'src/app/common/service/jwt.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() user: any
  currentUser:IUser

  constructor(
    private jwtService:JwtService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.jwtService.getUser();
  }


  updateFollow(userId){

  }

  AddFriend(userId){
    
  }
}
