import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtService } from 'src/app/common/service/jwt.service';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../common/service/api-config.service';

@Injectable()
export class FriendApiService {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private apiConfig: ApiConfigService
  ) { }

  addFriend(userId: string, friendId: string) {
    const { friendUrl, addFriend } = this.apiConfig.friendApi
    const url = friendUrl + addFriend

    return this.httpClient.post(url, { userId, friendId });
  }

  getAllUsers(filter?): Observable<any[]> {
    const data = { filter: filter, userId: this.jwtService.getUserId() }

    const { friendUrl, searchUsers } = this.apiConfig.friendApi
    const url = friendUrl + searchUsers(JSON.stringify(data));

    return this.httpClient.get<any[]>(url)
  }


  updateFollow(userId: string, friendId: string) {
    const { friendUrl, updateFollowFriend } = this.apiConfig.friendApi
    const url = friendUrl + updateFollowFriend

    return this.httpClient.post(url, { userId, friendId });
  }

}
