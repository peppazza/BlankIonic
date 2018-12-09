import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable()
export class AlertService {
	
	alert: any;
	
	constructor(private alertController: AlertController) {
	}
	
	public async present(header: string, subHeader: string, message: string): Promise<any> {
		const alert = await this.alertController.create({
			header,
			subHeader,
			message,
			inputs: [
				{
					name: 'firstName',
					type: 'text',
					placeholder: 'First name'
				},
				{
					name: 'lastName',
					type: 'text',
					id: 'last-name-id',
					value: 'Smith',
					placeholder: 'Last name'
				}
			],
			buttons: [
				{
					text: 'Confirm',
					cssClass: 'secondary',
					handler: (res) => {
						console.log('Confirm');
						console.log(res);
					}
				}, {
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel');
					}
				}
			]
		});
		alert.present();
	}
	
}