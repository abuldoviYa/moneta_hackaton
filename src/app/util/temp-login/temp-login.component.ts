import {Component, inject} from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../../backapi.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-temp-login',
  templateUrl: './temp-login.component.html',
  styleUrls: ['./temp-login.component.scss']
})
export class TempLoginComponent {
  private cardId: number;
  private route;
  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService) {
    this.titleService.setTitle("Временный логин " + apiService.title);
    this.route=inject(ActivatedRoute);
    this.cardId = parseInt(this.route.snapshot.paramMap.get('id')!)
    if(this.cardId == -1){
      localStorage.removeItem("id")
      localStorage.removeItem("consent")
    } else {
      localStorage.setItem("id",this.cardId.toString())
    }


  }

}
