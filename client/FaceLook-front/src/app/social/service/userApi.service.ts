import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtService } from 'src/app/common/service/jwt.service';

@Injectable()
export class UserApiService {
  url = "http://localhost:3000/user/";

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) { }

  addFriend(post: any) {
    return this.httpClient.post(this.url + "addFriend", post);
  }

  getAllUsers(filter?) {
    const data = { filter: filter, userId: this.jwtService.getUserId() }
    return this.httpClient.get(this.url + `searchUsers\\${JSON.stringify(data)}`)
  }


  updateFollow(userId, friendId) {
    return this.httpClient.patch(this.url + "updateFollow", { userId, friendId });
  }

}
