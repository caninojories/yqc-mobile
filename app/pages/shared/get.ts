import {Injectable} from 'angular2/core';
import {Headers} from 'angular2/http';
import {AuthJwtToken} from './jwt';
import {CONFIG} from './config';

declare var oboe;

@Injectable()
export class HttpGet {
  constructor(private _authJwtToken: AuthJwtToken) {
  }

  login(user) {
    return new Promise<boolean>((resolve, reject) => {
      oboe(CONFIG.hostName + '/api_v1/user/login?account_id='+ user.name + '&password=' + user.password)
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

  transferBalance(amount, provider, type) {
    let header = new Headers();
    header.append('Authorization', this._authJwtToken.getToken());

    return new Promise<boolean>((resolve, reject) => {
      oboe({
        url     : CONFIG.hostName + '/api_v1/user/transfer/balance/' + provider + '?amount=' + amount + '&type=' + type,
        method  : 'GET',
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

  transferBalancePT(amount, gameType, bankType) {
    let header = new Headers();
    header.append('Authorization', this._authJwtToken.getToken());

    return new Promise<boolean>((resolve, reject) => {
      oboe({
        url     : CONFIG.hostName + '/api_v1/user/transfer/balance/PT/' + gameType + '?amount=' + amount + '&bankType=' + bankType,
        method  : 'GET',
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

  checkBalance() {
    let header = new Headers();
    header.append('Authorization', this._authJwtToken.getToken());

    return new Promise<boolean>((resolve, reject) => {
      oboe({
        url     : CONFIG.hostName + '/api_v1/user/balance',
        method  : 'GET',
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
