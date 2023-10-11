import { Component } from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  constructor(private apiService: ApiService) {
  }

  protected readonly Math = Math;

  cards?: any[] = JSON.parse(localStorage.getItem("cards")!);

  countries? = this.apiService.getAvailablecountries();

  showAllCards:boolean = false;

  onShowAllCards(): void {
    this.showAllCards = !this.showAllCards;
  }
}
