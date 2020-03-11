import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtService } from '../../common/service/jwt.service';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../common/service/api-config.service';
import { tap } from 'rxjs/operators';
import { IUser } from '../../common/model/user';

export interface IFriendApi {
  addFriend(userId: string, friendId: string): Observable<IUser>,
  getAllUsers(filter?: string): Observable<IUser[]>,
  updateFollow(userId: string, friendId: string): Observable<IUser>
}

@Injectable()
export class FriendApiService implements IFriendApi {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private apiConfig: ApiConfigService
  ) { }

  addFriend(userId: string, friendId: string): Observable<IUser> {
    const { friendUrl, addFriend } = this.apiConfig.friendApi
    const url = friendUrl + addFriend

    return this.httpClient.post<IUser>(url, { userId, friendId })
  }

  getAllUsers(filter?: string): Observable<IUser[]> {
    const data = { filter: filter, userId: this.jwtService.getUserId() }

    const { friendUrl, searchUsers } = this.apiConfig.friendApi
    const url = friendUrl + searchUsers(JSON.stringify(data));

    return this.httpClient.get<any[]>(url)
  }


  updateFollow(userId: string, friendId: string) {
    const { friendUrl, updateFollowFriend } = this.apiConfig.friendApi
    const url = friendUrl + updateFollowFriend

    return this.httpClient.post<IUser>(url, { userId, friendId });
  }

}
