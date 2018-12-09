import {Component} from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	
	constructor() {
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
	
}
