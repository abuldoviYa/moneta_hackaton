import { Component } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent {

  agreed: boolean = false;
  constructor(private apiService: ApiService) {
  }
  submitForm() {
    this.apiService.setConsent()
    window.location.reload();
  }
}
