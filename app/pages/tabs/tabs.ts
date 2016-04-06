import {Page, NavController} from 'ionic-angular';
import {Transfer} from '../transfer/transfer';
import {GameLobby} from '../gamelobby/gameLobby';
import {Settings} from '../settings/settings';
import {OnInit} from 'angular2/core';
import {Login} from '../login/login';

declare var $;
declare var cordova;

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage implements OnInit  {
  transfer  : any = Transfer;
  gameLobby : any = GameLobby;
  settings  : any = Settings;

  constructor(private _nav: NavController) {
    document.addEventListener('deviceready', onDeviceReady, false);
      function onDeviceReady() {
        window.open   = cordova.InAppBrowser.open;
      }
  }

  ngOnInit() {
  }

  start() {
    let urlWindow = window.open('http://cashapi.dg20mu.com/cashapi/DoBusiness.aspx?params=YWdlbnQ9Z290ZXlxYyR1c2VybmFtZT1UTkExQTJQMSRwYXNzd29yZD0xYmJkODg2NDYwODI3MDE1ZTVkNjA1ZWQ0NDI1MjI1MSRkb21haW49Y2FzaGFwaS5kZzIwbXUuY29tJGlmcmFtZT0xJGdhbWV0eXBlPTEkZ2FtZWtpbmQ9MCRwbGF0Zm9ybW5hbWU9YWckbGFuZz1udWxsJG1ldGhvZD10Zw==&key=f18fe10040dd8fb698ecc0ece47e018e','_blank', 'hardware=no,location=no');
    urlWindow.addEventListener('loadstop', function(event) {
      console.log(event);
    });
  }
}
