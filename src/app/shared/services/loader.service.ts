import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable()
export class LoaderService {
	
	private loader: HTMLIonLoadingElement;
	
	constructor(private loadingController: LoadingController) {
	}
	
	public async present(): Promise<HTMLIonLoadingElement> {
		this.loader = await this.loadingController.create({
			animated: true,
			translucent: true
		});
		
		this.loader.present();
		
		return this.loader;
	}
	
	public dismiss() {
		if (this.loader) {
			this.loader.dismiss();
			return;
		}
		console.log('loader is undefined');
	}
	
}