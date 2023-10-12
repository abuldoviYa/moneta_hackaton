import {Component, inject, Input} from '@angular/core';
import {CardData} from "../../interfaces/CardData";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ApiService} from "../../api.service";
import {Card} from "../../card";
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
export class CardPageUiComponent {
  data: CardData = {
    imageId: "pDGNBK9A0sk",
    state: "default",
  };

  constructor() {
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


}
