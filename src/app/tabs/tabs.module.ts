import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {TabsRoutingModule} from './tabs-routing.module';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {TabsComponent} from './tabs.component';
import {CardDeckListComponent} from './card-deck-list/card-deck-list.component';
import { CardListingComponent } from './card-listing/card-listing.component';
import { CardTypeListComponent } from './card-type-list/card-type-list.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import {SearchComponent} from '../shared/search/search.component';

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TabsRoutingModule,
	],
	declarations: [
		TabsComponent,
		HomeComponent,
		ContactsComponent,
		CardDeckListComponent,
		CardListingComponent,
		CardTypeListComponent,
		CardDetailComponent,
		SearchComponent
	]
})
export class TabsModule { }