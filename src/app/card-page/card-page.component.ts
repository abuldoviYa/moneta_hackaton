import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {Card} from "../entities/card";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {Bank} from "../entities/bank";
import {map} from "rxjs";

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

   bankInfo!: Bank;
   banks = this.apiService.getBanks();

  card!: Card

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.backApi.getCard(this.cardId).subscribe(
          x=> {
            this.card = x.data
            this.card.cardNumber = "** " + this.card.cardNumber;
            let m = x.data.bankName

            this.backApi.getBanks().pipe( map(data => {
              return data.data.find((x: { bankName: string; }) => x.bankName == m);
            })).subscribe(x=>this.bankInfo = x.data)
          })
    }
  }
}
