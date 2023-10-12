import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent {

  agreed: boolean = false;
  constructor(private apiService: ApiService, private titleService:Title) {
    this.titleService.setTitle("Соглашение" + apiService.title);

  }
  submitForm() {
    this.apiService.setConsent()
    window.location.reload();
  }
}
