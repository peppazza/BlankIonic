import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {CardFavoriteStore} from '../../shared/services/card-favorite.store';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	
	constructor(private storage: Storage,
				private cardFavoriteStore: CardFavoriteStore) {
	}
	
	private async myFuntion(): Promise<string> {
		return Promise.resolve('Hello!');
	}
	
	testClassicThenPromise(event) {
		this.myFuntion().then(res => {
			console.log(res);
		});
	}
	
	async testAsyncAwaitPromise(event) {
		const p = await this.myFuntion();
		console.log(p);
	}
	
	clearFavoriteCards(event) {
		this.storage.remove(this.cardFavoriteStore.favoriteCardsStoreKey);
	}
	
}
