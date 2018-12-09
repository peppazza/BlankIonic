import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs/index';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	
	@Input() items: any[];
	@Input() properties: string[];
	
	@Output('onSearch') onSearchEmitter = new EventEmitter();
	
	searchSubject = new BehaviorSubject<string>('');
	
	constructor() {
	}
	
	ngOnInit() {
		this.searchSubject
			.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe(res => {
				if (!this.items || this.items.length === 0) {
					return;
				}
				
				if (!res) {
					this.onSearchEmitter.emit(this.items);
					return;
				}
				
				res = res.trim().toLowerCase();
				const filteredItems = this.items.filter(item => {
					for (const property of this.properties) {
						if (item[property] && item[property].toLowerCase().includes(res)) {
							return true;
						}
					}
					return false;
				});
				this.onSearchEmitter.emit(filteredItems);
			}, err => {
				console.log(err);
			});
	}
	
	ionViewWillLeave() {
		this.searchSubject.unsubscribe();
	}
	
	change(event) {
		this.searchSubject.next(event.detail.value);
	}
	
}
