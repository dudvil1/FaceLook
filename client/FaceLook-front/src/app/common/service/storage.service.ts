import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private tokenKey = "token"
  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
