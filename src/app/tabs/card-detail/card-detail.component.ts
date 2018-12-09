import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../../shared/services/card.service';
import {Card} from '../../shared/model/card-deck';
import {ToastService} from '../../shared/services/toast.service';
import {LoaderService} from '../../shared/services/loader.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
	selector: 'app-card-detail',
	templateUrl: './card-detail.component.html',
	styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent {
	
	card: Card;
	
	constructor(private activatedRoute: ActivatedRoute,
				private cardService: CardService,
				private loaderService: LoaderService,
				private toastService: ToastService,
				private alertService: AlertService) {
	}
	
	ionViewWillEnter() {
		this.loadCard();
	}
	
	loadDefaultImg(event) {
		console.log(event);
	}
	
	cardText(): string {
		return this.card.text;
	}
	
	private loadCard() {
		this.loaderService.present();
		
		this.activatedRoute.params.subscribe(params => {
			const cardId = params['cardId'];
			try {
				this.cardService.getCardById(cardId)
					.subscribe(res => {
						console.log(res);
						this.card = res[0];
						
						this.alertService.present('Alert', 'From card detail', 'Data has been loaded');
						this.loaderService.dismiss();
					}, err => {
						this.loaderService.dismiss();
						
						console.log(err);
						
						
					})
			} catch (e) {
				console.log(e);
			}
		}, err => {
			console.log(err);
		});
	}
	
}
