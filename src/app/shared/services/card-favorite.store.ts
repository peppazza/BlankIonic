import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {Storage} from '@ionic/storage';
import {Card} from '../model/card-deck';

@Injectable()
export class CardFavoriteStore {
	
	private FAVORITE_CARDS_STORE_KEY = 'favoriteCards';
	
	private _favoriteCardsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
	
	constructor(private storage: Storage) {
		// TODO for dev
		// this.storage.remove(this.FAVORITE_CARDS_STORE_KEY);
		
		this.loadInitialData();
	}
	
	private loadInitialData() {
		this.storage.get(this.FAVORITE_CARDS_STORE_KEY).then(favoriteCards => {
			this._favoriteCardsSubject.next(favoriteCards || {});
		});
	}
	
	get favoriteCards(): Observable<any> {
		return this._favoriteCardsSubject.asObservable();
	}
	
	get favoriteCardsStoreKey(): string {
		return this.FAVORITE_CARDS_STORE_KEY;
	}
	
	toggleFavoriteCard(card: Card) {
		const favoriteCards = this._favoriteCardsSubject.getValue();
		
		if (!card.favorite) {
			favoriteCards[card.cardId] = card;
		} else {
			delete favoriteCards[card.cardId];
		}
		card.favorite = !card.favorite;
		
		this.storage.set(this.FAVORITE_CARDS_STORE_KEY, favoriteCards).then(res => {
			console.log(`setting ${this.FAVORITE_CARDS_STORE_KEY} into store success`, res);
			
			this._favoriteCardsSubject.next(res);
		}).catch(err => {
			console.log(`setting ${this.FAVORITE_CARDS_STORE_KEY} into store error`, err);
		});
	}
	
}