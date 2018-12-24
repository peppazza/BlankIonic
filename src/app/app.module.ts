import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CardService} from './shared/services/card.service';
import {HttpClientModule} from '@angular/common/http';
import {LoaderService} from './shared/services/loader.service';
import {ToastService} from './shared/services/toast.service';
import {AlertService} from './shared/services/alert.service';
import {IonicStorageModule} from '@ionic/storage';
import {CardFavoriteStore} from './shared/services/card-favorite.store';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Firebase} from '@ionic-native/firebase/ngx';
import {FCMService} from './shared/services/fcm.service';

@NgModule({
	declarations: [
		AppComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		AppRoutingModule,
		IonicModule.forRoot(),
		IonicStorageModule.forRoot(),
		// HTTP
		HttpClientModule,
		// FIREBASE
		AngularFireModule.initializeApp({
			apiKey: "AIzaSyARIA5KGOmEryOqC1knyHMGBogCxRQYmbY",
			authDomain: "ioniclearnapi.firebaseapp.com",
			databaseURL: "https://ioniclearnapi.firebaseio.com",
			projectId: "ioniclearnapi",
			storageBucket: "ioniclearnapi.appspot.com",
			messagingSenderId: "208944314111"
		}),
		AngularFirestoreModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
		// SERVICES
		{provide: CardService, useClass: CardService},
		{provide: LoaderService, useClass: LoaderService},
		{provide: ToastService, useClass: ToastService},
		{provide: AlertService, useClass: AlertService},
		CardFavoriteStore,
		// FIREBASE
		Firebase,
		FCMService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
