import {Injectable} from '@angular/core';
import {Firebase} from '@ionic-native/firebase/ngx';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Platform} from '@ionic/angular';
import {Observable} from 'rxjs/index';
import {ToastService} from './toast.service';

@Injectable()
export class FCMService {
	
	constructor(private firebase: Firebase,
				private afs: AngularFirestore,
				private platform: Platform,
				private toastService: ToastService) {
	}
	
	async getToken() {
		var token;
		
		debugger;
		if (this.platform.is('android')) {
			token = await this.firebase.getToken();
		}
		
		if (this.platform.is('ios')) {
			token = await this.firebase.getToken();
			await this.firebase.grantPermission();
		}
		
		this.saveToken(token);
	}
	
	private saveToken(token) {
		if (!token)
			return;
		
		const devicesRef = this.afs.collection('devices');
		
		const data = {
			token,
			userId: 'testUserId'
		};
		return devicesRef.doc(token).set(data);
	}
	
	onNotifications(): Observable<any> {
		return this.firebase.onNotificationOpen();
	}
	
}