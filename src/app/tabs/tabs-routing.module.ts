import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {TabsComponent} from './tabs.component';
import {CardDeckListComponent} from './card-deck-list/card-deck-list.component';
import {CardListingComponent} from './card-listing/card-listing.component';
import {CardDetailComponent} from './card-detail/card-detail.component';

const routes: Routes = [
	{path: '', redirectTo: '/tabs/(home:home)', pathMatch: 'full'},
	{
		path: 'tabs',
		component: TabsComponent,
		children: [
			{
				path: 'home',
				outlet: 'home',
				component: HomeComponent
			}, {
				path: 'contacts',
				outlet: 'contacts',
				component: ContactsComponent
			}, {
				path: 'card-deck-list',
				outlet: 'cards',
				component: CardDeckListComponent
			}, {
				path: 'card-listing',
				outlet: 'cards',
				component: CardListingComponent
			}, {
				path: 'card-listing/:deckGroupName/:deckName',
				outlet: 'cards',
				component: CardListingComponent
			}, {
				path: 'card/:cardId',
				outlet: 'cards',
				component: CardDetailComponent
			}
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class TabsRoutingModule {
}