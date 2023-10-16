import {Component, inject, OnInit} from '@angular/core';
import {CardData} from "../interfaces/CardData";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {Card} from "../entities/card";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {
  private cardId: number;
  private route;
  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService) {
    this.titleService.setTitle("Карта " + apiService.title);
   this.route=inject(ActivatedRoute);
   this.cardId = parseInt(this.route.snapshot.paramMap.get('id')!)
  }



  card!: Card

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.backApi.getCard(this.cardId).subscribe(
          x=> {
            this.card = x.data
            this.card.cardNumber = "** " + this.card.cardNumber;
          })
    }
  }
}
