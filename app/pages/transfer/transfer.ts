import {Page, Alert, NavController, Events} from 'ionic-angular';
import {OnInit, Input} from 'angular2/core';
import {HttpGet} from '../shared/get';
import {HttpPost} from '../shared/post';
import {AuthCommonJwt} from '../shared/commonJwt';
import {Toast} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/transfer/transfer.html',
  providers: [
    HttpGet,
    HttpPost
  ]
})
export class Transfer implements OnInit  {
  constructor(
    private _events: Events,
    private _nav: NavController,
    private _httpGet: HttpGet,
    private _httpPost: HttpPost,
    private _authCommonJwt: AuthCommonJwt) {}

  @Input() balance: string = null;
  private intBalance: number = 0;
  private URL: string = null;
  @Input() currencyName: string = null;

  ngOnInit() {
    this.balance = this._authCommonJwt.getToken('balance');
    this.balance = parseFloat(this.balance).toFixed(2);
    this.currencyName = this._authCommonJwt.getToken('currency_name');

    this._events.subscribe('user:balance', (balance) => {
      this.balance = parseFloat(balance[0]).toFixed(2);
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
            /**
             * check if we have enough balance to deposit
             */
            if (!!!deposit.amount) {
              Toast.show('Please Input a valid amount', '2000', 'center').subscribe(
                toast => {
                });
              return;
            }
            if (parseFloat(this.balance) < parseFloat(deposit.amount)) {
              Toast.show('Not Enough Credit!', '2000', 'center').subscribe(
                toast => {
                });

              return;
            }
            if (parseFloat(deposit.amount) < 1) {
              Toast.show('Please Input a valid amount', '2000', 'center').subscribe(
                toast => {
                });
            } else {
              this.chooseProvider(deposit, 'deposit');
            }
          }
        }
      ]
    });

    this._nav.present(prompt);
  }

  doProcess(amount, provider, type) {
    let self = this;
    let beginTransferTime = performance.now();
    window['plugins'].spinnerDialog.show('', 'Transfering...', true);

    if (provider === 'PT') {
      this._httpGet.transferBalancePT(amount, 'inMobile', type)
        .then(status => {
          if (type === 'deposit') {
            self.intBalance = parseFloat(self.balance) - amount;
            self.balance = self.intBalance.toFixed(2);
            self._authCommonJwt.setToken('balance', self.balance);
            this._events.publish('user:balance', self.balance);
            window['plugins'].spinnerDialog.hide();
            Toast.show('Deposit Success!', '2000', 'center').subscribe(
              toast => {
              });
          } else if (type === 'withdraw') {
            self.intBalance = parseFloat(self.balance) + parseFloat(amount);
            self.balance    = self.intBalance.toFixed(2);
            self._authCommonJwt.setToken('balance', self.balance);
            this._events.publish('user:balance', self.balance);

            window['plugins'].spinnerDialog.hide();
            Toast.show('Withdraw Success!', '2000', 'center').subscribe(
              toast => {
              });
          }
        })
        .catch(error => {

        });
    } else {
      this._httpGet.transferBalance(amount, provider, type)
        .then(status => {
        let bool: boolean = status;
        let response: any = <any> bool;

        if (response.data.transferStatus === 1) {
          if (type === 'deposit') {
            self.intBalance = parseFloat(self.balance) - amount;
            self.balance = self.intBalance.toFixed(2);
            self._authCommonJwt.setToken('balance', self.balance);
            this._events.publish('user:balance', self.balance);
            /**
             * Tweak the launch game
             */
            window['plugins'].spinnerDialog.hide();
            this.launchGame();
          } else if (type === 'withdraw') {
            self.intBalance = parseFloat(self.balance) + parseFloat(amount);
            self.balance    = self.intBalance.toFixed(2);
            self._authCommonJwt.setToken('balance', self.balance);
            this._events.publish('user:balance', self.balance);

            window['plugins'].spinnerDialog.hide();
            Toast.show('Withdraw Success!', '2000', 'center').subscribe(
              toast => {
              });
          }
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
            message = 'Not Enough Credit';
          } else {
            message = 'Something went wrong. Please try again...';
          }

          window['plugins'].spinnerDialog.hide();
          Toast.show(message, '2000', 'center').subscribe(
            toast => {
            });
        }, timeoutTimer);
      });
    }
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

      alert.addInput({
        type: 'radio',
        label: 'PlayTech',
        value: 'PT'
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
            /**
             * check if we have enough balance to deposit
             */
            if (!!!deposit.amount) {
              Toast.show('Please Input a valid amount', '2000', 'center').subscribe(
                toast => {
                });
              return;
            }

            if (parseFloat(deposit.amount) < 1) {
              Toast.show('Please Input a valid amount', '2000', 'center').subscribe(
                toast => {
                });
            } else {
              this.chooseProvider(deposit, 'withdraw');
            }
          }
        }
      ]
    });

    this._nav.present(prompt);
  }

  launchGame() {
    window['plugins'].spinnerDialog.show('', 'Validating in game balance...', true);
    this._httpPost.gameLauncher('AG')
      .then(launcher => {
      /**
       * set the iframe
       */
      let bool: boolean = launcher;
      let response: any = <any> bool;

      this.URL = response.data.url;
      console.log(this.URL);
      let urlWindow = window.open(this.URL,'_blank', 'hardware=no,location=no,clearcache=yes,hidden=yes');
      urlWindow.addEventListener('loadstop', function(event) {
        urlWindow.close();
        window['plugins'].spinnerDialog.hide();
        Toast.show('Deposit Success!', '2000', 'center').subscribe(
          toast => {
          });
      });

      urlWindow.addEventListener('loaderror', function(event) {
        Toast.show('Something went wrong. Please try again', '2000', 'center').subscribe(
          toast => {
          });
      });

    })
    .catch(error => {
      Toast.show('Something went wrong. Please try again', '2000', 'center').subscribe(
        toast => {
        });
    });
  }
}
