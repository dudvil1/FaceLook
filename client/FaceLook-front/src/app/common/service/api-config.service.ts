import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface FriendApiConfig {
  friendUrl: string
  searchUsers(data: string): string;
  addFriend: string;
  updateFollowFriend: string;
}
export interface SocialApiConfig {
  socialUrl: string
  addPost: string;
  getPosts: string;
  filterPosts(filter: string): string;
  addLike: string;
  removeLike: string;
}
export interface DefaultApiConfig {
  defualtUrl: string
  help: string;
  status: string;
}
export interface RegistrationApiConfig {
  registrationUrl: string
  register: string;
  login: string;
  verifyAccount: string;
  forgetPassword: string;
  getResetCodePassword: string;
}
export interface ApiConfig {
  baseUrl: string,
  imageUrl: string
  friendApi: FriendApiConfig,
  defaultApi: DefaultApiConfig,
  registrationApi: RegistrationApiConfig,
  socialApi: SocialApiConfig
}

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService implements ApiConfig {
  imageUrl: string;
  baseUrl: string;
  friendApi: FriendApiConfig
  defaultApi: DefaultApiConfig
  registrationApi: RegistrationApiConfig;
  socialApi: SocialApiConfig

  constructor() {
    this.baseUrl = environment.baseUrl;
    this.imageUrl = `${this.baseUrl}/public/uploads/images/`
    this.setFriendsApi();
    this.setDefualtApi();
    this.setRegistrationApi();
    this.setSocialApi();
  }

  private setSocialApi() {
    this.socialApi = {
      socialUrl: `${this.baseUrl}/social`,
      addPost: `/addPost`,
      getPosts: `/getPosts`,
      filterPosts: (filter) => {
        return `/filterPosts/${filter}`;
      },
      addLike: `/addLike`,
      removeLike: `/removeLike`,
    };
  }

  private setRegistrationApi() {
    this.registrationApi = {
      registrationUrl: `${this.baseUrl}/registration`,
      register: '/register',
      login: "/login",
      verifyAccount: "/verifyAccount",
      forgetPassword: "/forgetPassword",
      getResetCodePassword: "/getResetCodePassword"
    };
  }

  private setDefualtApi() {
    this.defaultApi = {
      defualtUrl: `${this.baseUrl}`,
      help: '/',
      status: '/status'
    };
  }

  private setFriendsApi() {
    this.friendApi = {
      friendUrl: `${this.baseUrl}/friend`,
      searchUsers: (data) => {
        return `/searchUsers/${data}`;
      },
      addFriend: "/addFriend",
      updateFollowFriend: "/updateFollowFriend"
    };
  }
}
