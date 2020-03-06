import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private jwtHelper: JwtHelperService,
    private storage: StorageService) { }

  getUserId(): string | null {
    const token = this.storage.getToken();
    if (token) {
      const user: IUser = this.getUserFromToken(token)
      return user._id
    }
    return null
  }

  getUser():IUser | null{
    const token = this.storage.getToken();
    if (token) {
      const user: IUser = this.getUserFromToken(token)
      return user
    }
    return null
  }

  private getUserFromToken(token):IUser{
    const tokenData =  this.jwtHelper.decodeToken(token)
    const user: IUser = tokenData[0]
    return user
  }
}
