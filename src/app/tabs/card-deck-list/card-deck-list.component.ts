import {Component} from '@angular/core';
import {CardService} from '../../shared/services/card.service';
import {CardDeck} from '../../shared/model/card-deck';
import {LoadingController} from '@ionic/angular';
import {LoaderService} from '../../shared/services/loader.service';
import {ToastService} from '../../shared/services/toast.service';

@Component({
	selector: 'app-cards',
	templateUrl: './card-deck-list.component.html',
	styleUrls: ['./card-deck-list.component.scss']
})
export class CardDeckListComponent {
	
	private readonly CARD_DECKS_ALLOWED = ['classes', 'factions', 'races', 'standard', 'sets']
	
	cardDecks: CardDeck[];
	
	loader: any;
	
	constructor(private cardService: CardService,
				private loaderService: LoaderService,
				private toastService: ToastService) {
	}
	
	async ionViewWillEnter() {
		this.loadDecks();
	}
	
	generateUrl(deckGroup: string, deck: string) {
		return `/tabs/(cards:card-listing/${deckGroup}/${deck})`;
	}
	
	private loadDecks() {
		this.loader = this.loaderService.present();
		
		this.cardService.getCardDecks()
			.subscribe((res) => {
				this.loaderService.dismiss();
				
				console.log(res);
				this.cardDecks = [];
				this.CARD_DECKS_ALLOWED.forEach((deckName: string) => {
					this.cardDecks.push({
						name: deckName,
						types: res[deckName]
					});
				});
				console.log(this.cardDecks);
			}, (err) => {
				this.loaderService.dismiss();
				
				console.log(err);
				
				this.toastService.presentErrorToast(err.status);
			}, () => {
				console.log('card cards stream ended');
			});
	}
	
}
