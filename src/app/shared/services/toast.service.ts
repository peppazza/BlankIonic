import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()
export class ToastService {
	
	constructor(private toastController: ToastController) {
	}
	
	public async presentToast(httpStatusCode: number) {
		const toast: any = await this.toastController.create({
			message: this.initMessage(httpStatusCode),
			duration: 2000
		});
		toast.present();
	}
	
	public async presentToastWhileUsingNotificationFeature(message: string) {
		const toast: any = await this.toastController.create({
			message,
			duration: 4000
		});
		toast.present();
	}
	
	public async presentErrorToast(httpStatusCode: number) {
		const toast: any = await this.toastController.create({
			position: 'middle',
			cssClass: 'my-toast',
			duration: 3000,
			message: this.initMessage(httpStatusCode)
		});
		
		toast.present();
	}
	
	private initMessage(httpStatusCode: number): string {
		let message;
		
		switch (httpStatusCode) {
			case 404:
				message = 'No data found';
				break;
			case 500:
				message = 'Server error';
				break;
			default:
				message = 'Error';
		}
		
		return message;
	}

}