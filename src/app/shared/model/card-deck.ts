export interface CardDeck {
	
	name: string;
	types: string[];
	
}

export interface Card {
	
	artist: string;
	cardId: string;
	cardSet: string;
	dbfId: number;
	health: number;
	img: string;
	imgGold: string;
	locale: string;
	name: string;
	playerClass: string;
	text: string;
	type: string;
	
}