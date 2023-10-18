import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {CardData} from "../../interfaces/CardData";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ApiService} from "../../api.service";
import {Card} from "../../entities/card";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-card-page-ui',
  templateUrl: './card-page-ui.component.html',
  styleUrls: ['./card-page-ui.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ])
    ])
  ]
})
export class CardPageUiComponent  {
  data: CardData = {
    imageId: "pDGNBK9A0sk",
    state: "default",
  };

  banks

  constructor(private apiService: ApiService) {
    this.banks = apiService.getBanks()
  }
  @Input()
  card!: Card | null
  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
  }

  formatShortCardNumber(s: string){
    return "·· " + s.substring(s.length-4)
  }

  formatFullCardNumber(cardNumber: string): string {
    // Remove any non-numeric characters
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    // Split the string into groups of 4 digits
    const groups = cleanedCardNumber.match(/(\d{1,4})/g);

    // Join the groups with space
    const formattedCardNumber = groups ? groups.join(' ') : '';

    return formattedCardNumber;
  }







}
