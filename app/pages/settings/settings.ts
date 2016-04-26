import {Page, NavController, Events} from 'ionic-angular';
import {OnInit, Input} from 'angular2/core';
import {AuthJwtToken} from '../shared/jwt';
import {HttpGet} from '../shared/get';
import {AuthCommonJwt} from '../shared/commonJwt';
import {Login} from '../login/login';
import {TabsPage} from '../tabs/tabs';
import {Toast} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [
    HttpGet
  ]
})
export class Settings implements OnInit  {
  constructor(
    private _events  : Events,
    private _httpGet : HttpGet,
    private _nav: NavController,
    private _authCommonJwt: AuthCommonJwt,
    private _authJwtToken: AuthJwtToken) {}

  @Input() balance: string = null;
  @Input() currencyName: string = null;

  ngOnInit() {
    this.balance      = parseFloat(this._authCommonJwt.getToken('balance')).toFixed(2);
    this.currencyName = this._authCommonJwt.getToken('currency_name');

    this._events.subscribe('user:balance', (balance) => {
      this.balance = parseFloat(balance[0]).toFixed(2);
    });
  }

  doLogout() {
    this._authJwtToken.removeToken();
    this._authCommonJwt.removeToken('balance');
    this._authCommonJwt.removeToken('currency_name');
    this._nav.pop();
  }

  refreshBalance() {
    window['plugins'].spinnerDialog.show('', 'Checking...', true);

    let notify = setTimeout(function() {
      window['plugins'].spinnerDialog.hide();
      Toast.show('Something went wrong...', '2000', 'center').subscribe(
        toast => {
          return;
        });
    }, 30000)

    this._httpGet.checkBalance()
      .then(user => {
        let bool: boolean = user;
        let response: any = <any> bool;

        /**
         * Listener for changing the balance
         */
        window['plugins'].spinnerDialog.hide();
        this.balance = parseFloat(response.data).toFixed(2);
        Toast.show('Success', '2000', 'center').subscribe(
          toast => {
            this._authCommonJwt.setToken('balance', response.data);
            this._events.publish('user:balance', this.balance);

            clearTimeout(notify);
          });
      })
      .catch(error => {
        window['plugins'].spinnerDialog.hide();
        Toast.show('Something went wrong...', '2000', 'center').subscribe(
          toast => {
            window['plugins'].spinnerDialog.hide();
            clearTimeout(notify);
          });
      });
  }
}
