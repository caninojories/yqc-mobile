import { Injectable } from 'angular2/core';
import { Storage, LocalStorage } from 'ionic-angular';


@Injectable()
export class AuthJwtToken {
  constructor() {
  }

  private storage = window.localStorage;
  private cachedToken;
  private userToken = 'yqc_token';

  setToken(token) {
    this.cachedToken = token;
    this.storage.setItem(this.userToken, token);
  }

  getToken() {
    if (!this.cachedToken) {
      this.cachedToken = this.storage.getItem(this.userToken);
    }

    return this.cachedToken;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  removeToken() {
    this.cachedToken = null;
    this.storage.removeItem(this.userToken);
  }
}
