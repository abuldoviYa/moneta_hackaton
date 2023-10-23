import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent {

  agreed: boolean = false;
  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService) {
    this.titleService.setTitle("Соглашение" + apiService.title);

  }
  submitForm() {
    this.backApi.setConsent()
    // window.location.reload();
  }
}
