import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {TabsPage} from '../tabs/tabs';
import {HttpGet} from '../shared/get';
import {AuthJwtToken} from '../shared/jwt';
import {AuthCommonJwt} from '../shared/commonJwt';


interface UserCredentials {
  name: string,
  password: any
}

@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [
    HttpGet,
    AuthJwtToken
  ]
})
export class Login implements OnInit  {
  public user: UserCredentials = {
    name: '',
    password: ''
  }

  constructor(
    private _nav: NavController,
    private _httpGet: HttpGet,
    private _authJwtToken: AuthJwtToken,
    private _authCommonJwt: AuthCommonJwt) {
    this._nav = _nav;

    if (_authJwtToken.getToken()) {
      this._nav.push(TabsPage);
    }
  }

  ngOnInit() {
  }

  goToTabs() {
    window['plugins'].spinnerDialog.show('Login', 'Please wait...', true);
    this._httpGet.login(this.user)
      .then(user => {
        let bool: boolean = user;
         let response: any = <any> bool;
         this._authJwtToken.setToken(response.data.token);

        if (user) {
          window['plugins'].spinnerDialog.hide();
          console.log(response.data);
          this._authCommonJwt.setToken('balance', response.data.user.balance);
          this._authCommonJwt.setToken('currency_name', response.data.currencyName);
          this._nav.push(TabsPage);

          setTimeout(function() {
            this.user.name      = '';
            this.user.password  = '';
          }, 1000);
        }
      })
      .catch(error => {
        window['plugins'].spinnerDialog.hide();
        let errorName = null;
        console.log(error);
        if (error.jsonBody && error.jsonBody.message === 'User Cannot Be Found') {
          errorName = 'Please try again...'
        } else {
          errorName = 'Something went wrong. Please try again';
        }
        window['plugins'].spinnerDialog.show('Login', errorName);
      });
  }
}
