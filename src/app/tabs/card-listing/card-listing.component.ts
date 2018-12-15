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
	
	constructor(private activatedRoute: ActivatedRoute,
				private cardService: CardService,
				private loadService: LoaderService,
				private toastService: ToastService,
				private storage: Storage) {
	}
	
	ionViewWillEnter() {
		console.log('*** entering ***');
		this.clearStorage();
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
	
	togglePreference(card: Card) {
		console.log(card.cardId);
		if (!card.favorite) {
			this.addCardToFavorites(card);
			card.favorite = !card.favorite;
		} else {
			this.removeCardFromFavorites(card);
			card.favorite = !card.favorite;
		}
	}
	
	private addCardToFavorites(card: Card) {
		this.storage.get('favoriteCards').then(res => {
			if (!res) {
				const favoriteCards = new Array();
				favoriteCards.push(card.cardId);
				this.storage.set('favoriteCards', favoriteCards).then(r => {
					console.log('PRINTING FAVORITE CARDS', r);
				});
				return;
			}
			if (res.indexOf(card.cardId) < 0) {
				res.push(card.cardId);
				this.storage.set('favoriteCards', res).then(r => {
					console.log('PRINTING FAVORITE CARDS', r);
				});
			}
		}).catch(err => {
			console.log(err);
		});
	}
	
	private removeCardFromFavorites(card: Card) {
		this.storage.get('favoriteCards').then(res => {
			if (!res) {
				return;
			}
			
			const favoriteCardsFiltered = new Array();
			for (const cardId of res) {
				if (cardId !== card.cardId) {
					favoriteCardsFiltered.push(cardId);
				}
			}
			
			this.storage.set('favoriteCards', favoriteCardsFiltered).then(r => {
				console.log('PRINTING FAVORITE CARDS', r);
			});
		}).catch(err => {
			console.log(err);
		});
	}
	
	async isFavorite(card: Card) {
		const res = await this.storage.get('favoriteCards');
		if (!res) {
			return false;
		}
		return res.indexOf(card.cardId);
	}
	
}
