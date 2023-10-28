import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {BackapiService} from "../../backapi.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{
  constructor(private apiService: ApiService, private backApi: BackapiService) {
  }

  protected readonly Math = Math;

  cards?: any[]

  countries? = this.apiService.getAvailablecountries();

  banks = this.apiService.getBanks();

  showAllCards:boolean = false;

  onShowAllCards(): void {
    this.showAllCards = !this.showAllCards;
  }

  ngOnInit(): void {
    this.backApi.getCards().subscribe(x=>this.cards = x.data);
    //console.log(this.cards)
  }

  truncateString(input: string): string {
    if (input.length > 20) {
      return input.substring(0, 20) + '...';
    }
    return input;
  }

}
