import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtService } from 'src/app/common/service/jwt.service';
import { Observable } from 'rxjs';

@Injectable()
export class FriendApiService {
  url = "http://localhost:3000/user/";

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) { }

  addFriend(userId: string, friendId: string) {
    return this.httpClient.post(this.url + "addFriend", { userId, friendId });
  }

  getAllUsers(filter?):Observable<any[]> {
    const data = { filter: filter, userId: this.jwtService.getUserId() }
    return this.httpClient.get<any[]>(this.url + `searchUsers\\${JSON.stringify(data)}`)
  }


  updateFollow(userId: string, friendId: string) {
    return this.httpClient.post(this.url + "updateFollowFriend", { userId, friendId });
  }

}
