import { Injectable } from 'angular2/core';
import {Headers} from 'angular2/http';
import {AuthJwtToken} from './../jwt';
import { CONFIG } from './../../shared/config';

declare var oboe;

@Injectable()
export class HttpPostCommons {
  constructor(private _authJwtToken: AuthJwtToken) {
  }

  transferBalance(amount, provider, type) {
    let header = new Headers();

    return new Promise<boolean>((resolve, reject) => {
      header.append('Authorization', this._authJwtToken.getToken());
      oboe({
        url     : CONFIG.hostName + '/api_v1/user/transfer/balance/' + provider + '?amount=' + amount + '&type=' + type,
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
    })
  }
}
