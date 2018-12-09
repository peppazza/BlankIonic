import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Card} from '../model/card-deck';

@Injectable()
export class CardService {
	
	private BASE_URL = 'https://omgvamp-hearthstone-v1.p.mashape.com';
	private headers = new HttpHeaders({
		'X-Mashape-Key': 'u5cpOI9rykmshTabwwFGgP7QQ0Tep1HsmJ1jsnfdkxGCaN3FPC'
	});
	constructor(private http: HttpClient) { }
	
	getCardDecks(): Observable<any> {
		return this.http.get<any>(`${this.BASE_URL}/info`, { headers: this.headers });
	}
	
	getCardsByDeckGroup(deckGroupName: string, deckName: string): Observable<Card[]> {
		return this.http.get<Card[]>(`${this.BASE_URL}/cards/${deckGroupName}/${deckName}`, { headers: this.headers });
	}
	
	getCardById(cardId: string): Observable<Card[]> {
		return this.http.get<Card[]>(`${this.BASE_URL}/cards/${cardId}`, { headers: this.headers });
	}
	
}