import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-type-list',
  templateUrl: './card-type-list.component.html',
  styleUrls: ['./card-type-list.component.scss']
})
export class CardTypeListComponent implements OnInit {

  @Input() deckGroupName: string;
  @Input() types: any[] = [];
  
  @Input() navigateTo: () => string;
  
  constructor() { }
  
  ngOnInit() {
  }

}
