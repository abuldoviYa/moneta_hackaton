import {Component, inject} from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../../backapi.service";
import {ActivatedRoute, Router} from "@angular/router";
import {timeout} from "rxjs";

@Component({
  selector: 'app-temp-login',
  templateUrl: './temp-login.component.html',
  styleUrls: ['./temp-login.component.scss']
})
export class TempLoginComponent {
  private cardId: number;
  private route;
  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService, private routeNavigate: Router) {
    this.titleService.setTitle("Временный логин " + apiService.title);
    this.route=inject(ActivatedRoute);
    this.cardId = parseInt(this.route.snapshot.paramMap.get('id')!)
    console.log(this.cardId)
    console.log("asdasd")
    if(this.cardId == -1){
      localStorage.clear()
      this.navigate()
    } else {
      localStorage.setItem("id",this.cardId.toString())
      localStorage.setItem("consent","true")
      setTimeout( () => {
        this.routeNavigate.navigate(["/"]).then(() => { window.location.reload()})
      }, 1000)
    }


  }

  navigate() {
    setTimeout( () => {
      this.routeNavigate.navigate(["/"]).then(() => { window.location.reload()})
    }, 1000)

  }

}
