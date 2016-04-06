import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {AuthJwtToken} from '../shared/jwt';
import {AuthCommonJwt} from '../shared/commonJwt';
import {Login} from '../login/login';
import {TabsPage} from '../tabs/tabs';

@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class Settings implements OnInit  {
  constructor(
    private _nav: NavController,
    private _authCommonJwt: AuthCommonJwt,
    private _authJwtToken: AuthJwtToken) {

  }

  ngOnInit() {

  }

  doLogout() {
    this._authJwtToken.removeToken();
    this._authCommonJwt.removeToken('balance');
    this._authCommonJwt.removeToken('currency_name');
    // this._nav.insert(1, Login);
    // this._nav.setPages([{page: Login}]);
    this._nav.pop();
  }
}
