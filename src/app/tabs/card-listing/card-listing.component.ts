import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../../shared/services/card.service';
import {Card} from '../../shared/model/card-deck';
import {LoaderService} from '../../shared/services/loader.service';
import {ToastService} from '../../shared/services/toast.service';
import {CardFavoriteStore} from '../../shared/services/card-favorite.store';

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
	
	private favoriteCards: any = {};
	
	constructor(private activatedRoute: ActivatedRoute,
				private cardService: CardService,
				private loadService: LoaderService,
				private toastService: ToastService,
				private cardFavoriteStore: CardFavoriteStore) {
		// load initial favorite cards
		this.cardFavoriteStore.favoriteCards.subscribe(favoriteCards => {
			this.favoriteCards = favoriteCards;
		});
	}
	
	ionViewWillEnter() {
		if (this.cards && this.cards.length === 0)
			this.loadCards();
	}
	
	doRefresh(event) {
		this.loadCards();
		
		// NB per simulare il tempo della http request
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
						
						for (const card of cards) {
							if (this.favoriteCards[card.cardId]) {
								card.favorite = true;
							} else {
								card.favorite = false;
							}
						}
						
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
		this.cardFavoriteStore.toggleFavoriteCard(card);
	}
	
}
