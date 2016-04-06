import {Page, Alert, NavController} from 'ionic-angular';
import {OnInit, Input} from 'angular2/core';
import {HttpGet} from '../shared/get';
import {AuthCommonJwt} from '../shared/commonJwt';

@Page({
  templateUrl: 'build/pages/transfer/transfer.html',
  providers: [
    HttpGet
  ]
})
export class Transfer implements OnInit  {
  constructor(
    private _nav: NavController,
    private _httpGet: HttpGet,
    private _authCommonJwt: AuthCommonJwt) {}

  @Input() balance: number = 0;
  @Input() currencyName: string = null;

  ngOnInit() {
    this.balance = this._authCommonJwt.getToken('balance');
    this.currencyName = this._authCommonJwt.getToken('currency_name');
    console.log(this.currencyName);
  }

  start() {
    let urlWindow = window.open('http://cashapi.dg20mu.com/cashapi/DoBusiness.aspx?params=YWdlbnQ9Z290ZXlxYyR1c2VybmFtZT1UTkExQTJQMSRwYXNzd29yZD0xYmJkODg2NDYwODI3MDE1ZTVkNjA1ZWQ0NDI1MjI1MSRkb21haW49Y2FzaGFwaS5kZzIwbXUuY29tJGlmcmFtZT0xJGdhbWV0eXBlPTEkZ2FtZWtpbmQ9MCRwbGF0Zm9ybW5hbWU9YWckbGFuZz1udWxsJG1ldGhvZD10Zw==&key=f18fe10040dd8fb698ecc0ece47e018e','_blank', 'hardware=no,location=no');
    urlWindow.addEventListener('loadstop', function(event) {
      console.log(event);
    });
  }

  doDeposit() {
    let prompt = Alert.create({
      title: 'Deposit',
      message: "Enter the amount you want to Deposit",
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Amount'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Ok',
          handler: deposit => {
            this.chooseProvider(deposit, 'deposit');
          }
        }
      ]
    });

    this._nav.present(prompt);
  }

  doProcess(amount, provider, type) {
    let beginTransferTime = performance.now();
    window['plugins'].spinnerDialog.show('', 'Transfering...', true);

    this._httpGet.transferBalance(amount, provider, type)
      .then(status => {
      let bool: boolean = status;
      let response: any = <any> bool;

      if (response.data.transferStatus === 1) {
        if (type === 'deposit') {
          this.balance = this.balance - amount;
        } else if (type === 'withdraw') {
          this.balance = this.balance + parseFloat(amount);
        }

        window['plugins'].spinnerDialog.hide();
      }
    })
    .catch(error => {
      let endTransferTime = performance.now();
      let meanTransferTime = endTransferTime - beginTransferTime;
      let timeoutTimer = 0;
      console.log(error);

      if (meanTransferTime < 2000) {
        timeoutTimer = 2000 - meanTransferTime;
      }

      setTimeout(function() {
        let message = null;
        if (error.jsonBody && error.jsonBody.message === 'no_enough_credit') {
          message = 'No Enough Credit';
        } else {
          message = 'Something went wrong. Please try again...';
        }
        window['plugins'].spinnerDialog.hide();
        window['plugins'].spinnerDialog.show('', message);
      }, timeoutTimer);
    });
  }

  chooseProvider(deposit, type) {
    let alert = Alert.create();
      alert.setTitle('Provider');

      alert.addInput({
        type: 'radio',
        label: 'Asian Gaming',
        value: 'AG',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Oriental Gaming',
        value: 'OG'
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: provider => {
          console.log('on click: ' + provider);
          this.doProcess(deposit.amount, provider, type);
        }
      });

      this._nav.present(alert);
  }

  doWithdraw() {
    let prompt = Alert.create({
      title: 'Withdraw',
      message: "Enter the amount you want to Withdraw",
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Amount'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: deposit => {
            this.chooseProvider(deposit, 'withdraw');
          }
        }
      ]
    });

    this._nav.present(prompt);
  }
}
