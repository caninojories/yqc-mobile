import {Page, NavController} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {TabsPage} from '../tabs/tabs';
import {HttpPost} from '../shared/post';
import {AuthJwtToken} from '../shared/jwt';
import {AuthCommonJwt} from '../shared/commonJwt';
import {Toast} from 'ionic-native';

interface UserCredentials {
  name: string,
  password: any
}

@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [
    HttpPost,
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
    private _httpPost: HttpPost,
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
    let self = this;
    this._httpPost.login(this.user)
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
            self.user.name      = '';
            self.user.password  = '';
          }, 1000);
        }
      })
      .catch(error => {
        window['plugins'].spinnerDialog.hide();
        let errorName = null;
        console.log(error);
        if (error.jsonBody && error.jsonBody.message === 'User Cannot Be Found') {
          errorName = 'Invalid Username/Password!'
        } else {
          errorName = 'Something went wrong. Please try again';
        }

        Toast.show(errorName, 'short', 'center').subscribe(
         toast => {
         });
      });
  }
}
