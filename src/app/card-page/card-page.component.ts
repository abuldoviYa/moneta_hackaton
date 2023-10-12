import {Component, inject, OnInit} from '@angular/core';
import {CardData} from "../interfaces/CardData";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {Card} from "../card";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit{
  constructor(private apiService: ApiService) {
  }
  private route = inject(ActivatedRoute);

  card!: Card
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.card = this.apiService.getCards().find(x=>x.cardNumber == id)
    }
  }
}
