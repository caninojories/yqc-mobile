import { Injectable } from 'angular2/core';
import {Headers} from 'angular2/http';
import {AuthJwtToken} from './jwt';

declare var oboe;

@Injectable()
export class HttpPost {
  constructor(private _authJwtToken: AuthJwtToken) {
  }

  gameLauncher(provider) {
    let header = new Headers();
    header.append('Authorization', this._authJwtToken.getToken());

    return new Promise<boolean>((resolve, reject) => {
      oboe({
        url     : 'http://192.168.1.212:3002/api_v1/user/launch/game/' + provider,
        method  : 'POST',
        headers : header
      })
      .done(user => {
        if (user.data) {
          resolve(user);
        }
      })
      .fail(error => {
        reject(error);
      });
    });
  }
}
