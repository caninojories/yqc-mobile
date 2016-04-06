import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Login} from './pages/login/login';
import {AuthJwtToken} from './pages/shared/jwt';
import {AuthCommonJwt} from './pages/shared/commonJwt';
import {TabsPage} from './pages/tabs/tabs';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers: [
    AuthJwtToken,
    AuthCommonJwt
  ],
  prodMode: true
})
export class MyApp {
  rootPage: any = null;

  constructor(
    platform: Platform,
    private _authJwtToken: AuthJwtToken) {
    this.rootPage = Login;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
