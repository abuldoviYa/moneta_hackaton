import {Component, Input} from '@angular/core';
import {Card} from "../../../entities/card";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-cards-iteration',
  templateUrl: './cards-iteration.component.html',
  styleUrls: ['./cards-iteration.component.scss']
})
export class CardsIterationComponent {
  @Input()
  card!: any
  @Input()
  countries!: Map<string, any> | undefined

  constructor(private apiService: ApiService) {

  }

  banks = this.apiService.getBanks();

  formatNumber(balance: number){
    return (Math.round(balance*100)/100).toLocaleString("ru-RU").replaceAll('.', ' ')
  }

    protected readonly Math = Math;
  protected readonly console = console;
}
