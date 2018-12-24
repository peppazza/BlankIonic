import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FCMService} from './shared/services/fcm.service';
import {ToastService} from './shared/services/toast.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(private platform: Platform,
				private splashScreen: SplashScreen,
				private statusBar: StatusBar,
				private fcmService: FCMService,
				private toastService: ToastService) {
		this.initializeApp();
		this.notificationSetup();
	}
	
	// Firebase
	private async notificationSetup() {
		const promiseOnToken = await this.fcmService.getToken();
		this.fcmService.onNotifications().subscribe(res => {
			console.log('notification...', res);
			this.toastService.presentToastWhileUsingNotificationFeature(`data received from Firebase OK: ${res.body}`);
		}, err => {
			console.error('notification...', err);
			this.toastService.presentToastWhileUsingNotificationFeature(`data received from Firebase FAILED: ${err}`);
		}, () => {
			console.log('notification...stream ended');
			this.toastService.presentToastWhileUsingNotificationFeature(`data received from Firebase STREAM ENDED`);
		})
	}
	
	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
