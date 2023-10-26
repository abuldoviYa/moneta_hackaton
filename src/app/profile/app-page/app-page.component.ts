import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent {
  constructor(private apiService: ApiService, private titleService:Title) {
    this.titleService.setTitle("О приложении" + apiService.title);
  }
}