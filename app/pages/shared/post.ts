import { Injectable } from 'angular2/core';
import {Headers} from 'angular2/http';
import {AuthJwtToken} from './jwt';
import {CONFIG} from './config';

declare var oboe;

@Injectable()
export class HttpPost {
  constructor(private _authJwtToken: AuthJwtToken) {
  }

  login(user) {
    return new Promise<boolean>((resolve, reject) => {
      oboe({
        url     : CONFIG.hostName + '/api_v1/user/login?account_id='+ user.name + '&password=' + user.password,
        method  : 'POST',
      })
      .done(user => {
        if (user.data) {
          resolve(user);
        }
      })
      .fail((error) => {
        reject(error);
      });
    });
  }

  gameLauncher(provider) {
    let header = new Headers();
    header.append('Authorization', this._authJwtToken.getToken());

    return new Promise<boolean>((resolve, reject) => {
      oboe({
        url     : CONFIG.hostName + '/api_v1/user/launch/game/' + provider,
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
