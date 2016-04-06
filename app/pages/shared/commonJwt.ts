import { Injectable } from 'angular2/core';


@Injectable()
export class AuthCommonJwt {
  constructor() {
  }

  private storage = window.localStorage;

  setToken(tokenName, tokenData) {
    this.storage.setItem(tokenName, tokenData);
  }

  getToken(tokenName) {
    return this.storage.getItem(tokenName);
  }

  isAuthenticated(tokenName) {
    return !!this.getToken(tokenName);
  }

  removeToken(tokenName) {
    this.storage.removeItem(tokenName);
  }
}
