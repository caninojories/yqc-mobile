import {Injectable} from 'angular2/core';
import {Headers} from 'angular2/http';
import {AuthJwtToken} from './../jwt';
import {CONFIG} from './../../shared/config';

declare var oboe;

@Injectable()
export class HttpPostPlaytech {
  constructor(private _authJwtToken: AuthJwtToken) {
  }

  transferBalancePT(amount, gameType, bankType) {
    let header = new Headers();
    header.append('Authorization', this._authJwtToken.getToken());

    return new Promise<boolean>((resolve, reject) => {
      oboe({
        url     : CONFIG.hostName + '/api_v1/user/transfer/balance/PT/' + gameType + '?amount=' + amount + '&bankType=' + bankType,
        method  : 'POST',
        headers : header
      })
      .done(user => {
        if (user.data) {
          resolve(user);
        }
      })
      .fail((error) => {
        reject(error);
      });
    })
  }
}
