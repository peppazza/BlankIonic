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

@NgModule({
	declarations: [
		AppComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		// HTTP
		HttpClientModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
		// SERVICES
		{provide: CardService, useClass: CardService},
		{provide: LoaderService, useClass: LoaderService},
		{provide: ToastService, useClass: ToastService},
		{provide: AlertService, useClass: AlertService}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
