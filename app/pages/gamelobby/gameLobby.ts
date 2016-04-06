import {Page} from 'ionic-angular';
import {Component, OnInit} from 'angular2/core';

declare var $;

@Page({
  templateUrl: 'build/pages/gamelobby/gameLobby.html',
})
export class GameLobby implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('canino');
  }

  start() {
    let urlWindow = window.open('http://cashapi.dg20mu.com/cashapi/DoBusiness.aspx?params=YWdlbnQ9Z290ZXlxYyR1c2VybmFtZT1UTkExQTJQMSRwYXNzd29yZD0xYmJkODg2NDYwODI3MDE1ZTVkNjA1ZWQ0NDI1MjI1MSRkb21haW49Y2FzaGFwaS5kZzIwbXUuY29tJGlmcmFtZT0xJGdhbWV0eXBlPTEkZ2FtZWtpbmQ9MCRwbGF0Zm9ybW5hbWU9YWckbGFuZz1udWxsJG1ldGhvZD10Zw==&key=f18fe10040dd8fb698ecc0ece47e018e','_blank', 'hardware=no,location=no');
    urlWindow.addEventListener('loadstop', function(event) {
      console.log(event);
    });
  }
}
