import {Page, Events} from 'ionic-angular';
import {Component, OnInit, Input} from 'angular2/core';
import {HttpPost} from '../shared/post';
import {AuthCommonJwt} from '../shared/commonJwt';
import {Toast} from 'ionic-native';

declare var $;

@Page({
  templateUrl: 'build/pages/gamelobby/gameLobby.html',
  providers: [
    HttpPost
  ]
})
export class GameLobby implements OnInit {
  constructor(
    private _events: Events,
    private _httpPost: HttpPost,
    private _authCommonJwt: AuthCommonJwt) {}

  private URL: any = null;
  private toast: any = null;
  @Input() balance: string = null;
  @Input() currencyName: string = null;

  ngOnInit() {
    this.balance      = parseFloat(this._authCommonJwt.getToken('balance')).toFixed(2);
    this.currencyName = this._authCommonJwt.getToken('currency_name');
    this._events.subscribe('user:balance', (balance) => {
      this.balance = parseFloat(balance[0]).toFixed(2);
    });
  }

  start() {
    let self = this;
    window['plugins'].spinnerDialog.show('', 'Accessing Game...', true);
    this._httpPost.gameLauncher('AG')
      .then(launcher => {
        window['plugins'].spinnerDialog.hide();
        /**
         * set the iframe
         */
        let bool: boolean = launcher;
        let response: any = <any> bool;

        this.URL = response.data.url;
        console.log(this.URL);
        let urlWindow = window.open(this.URL,'_blank', 'hardware=no,location=no,clearcache=yes');
        urlWindow.addEventListener('loadstart', function(event) {
          self.toast = Toast.show('Loading... Please wait.', 'short', 'center').subscribe(
            toast => {
            });
        });
        
        urlWindow.addEventListener('loadstop', function(event) {
          Toast.hide()
            .then(function(message) {
              console.log('hide toast');
            });
        });

        urlWindow.addEventListener('loaderror', function(event) {
          console.log('loaderror');
          urlWindow.close();
          Toast.show('Server Error. Please try again...', 'short', 'center').subscribe(
            toast => {
            });
        });
    });
  }
}
