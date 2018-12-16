import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../../shared/services/card.service';
import {Card} from '../../shared/model/card-deck';
import {LoaderService} from '../../shared/services/loader.service';
import {ToastService} from '../../shared/services/toast.service';
import {Storage} from '@ionic/storage';

@Component({
	selector: 'app-card-listing',
	templateUrl: './card-listing.component.html',
	styleUrls: ['./card-listing.component.scss']
})
export class CardListingComponent {
	
	deckGroupName: string;
	deckName: string;
	
	cards: Card[] = [];
	showedCards: Card[] = []
	
	isLoading = false;
	
	private FAVORITE_CARDS_STORAGE_KEY = 'favoriteCards';
	private favoriteCards: any = {};
	
	constructor(private activatedRoute: ActivatedRoute,
				private cardService: CardService,
				private loadService: LoaderService,
				private toastService: ToastService,
				private storage: Storage) {
	}
	
	ionViewWillEnter() {
		// TODO do in dev; remove in prod
		this.storage.set(this.FAVORITE_CARDS_STORAGE_KEY, {});
		
		if (this.cards && this.cards.length === 0)
			this.loadCards();
	}
	
	private clearStorage() {
		// this.storage.clear();
		this.storage.remove('favoriteCards');
	}
	
	doRefresh(event) {
		this.loadCards();
		
		// NB
		// per simulare il tempo della http request
		setTimeout(() => {
			event.target.complete();
		}, 2000);
	}
	
	generateUrlToCardDetail(cardId: string) {
		return `/tabs/(cards:card/${cardId})`;
	}
	
	private loadCards() {
		this.activatedRoute.params.subscribe(res => {
			this.loadService.present();
			
			this.deckGroupName = res['deckGroupName'];
			this.deckName = res['deckName'];
			
			try {
				this.cardService.getCardsByDeckGroup(this.deckGroupName, this.deckName)
					.subscribe(cards => {
						this.cards = cards.slice(0, 7);
						this.showedCards = Array.from(this.cards);
						
						this.loadService.dismiss();
					}, err => {
						this.loadService.dismiss();
						
						console.log(err);
						
						this.toastService.presentErrorToast(err.status);
					}, () => {
						console.log('stream ended');
					});
			} catch (e) {
				console.log(e);
			}
		}, err => {
			console.log(err);
		}, () => {
			console.log('params stream ended');
		});
	}
	
	onSearch(event) {
		this.showedCards = event;
		this.isLoading = false;
	}
	
	onSearchStartes(event) {
		this.isLoading = true;
	}
	
	toggleFavorite(card: Card) {
		console.log(card.cardId);
		if (!card.favorite) {
			// add to favorite cards
			this.favoriteCards[card.cardId] = card;
		} else {
			// remove from favorite cards
			delete this.favoriteCards[card.cardId];
		}
		this.storage.set(this.FAVORITE_CARDS_STORAGE_KEY, this.favoriteCards)
			.then((err) => {
				console.log('after setting favorite cards in storage');
				console.log(err);
			});
		card.favorite = !card.favorite;
	}
	
}
