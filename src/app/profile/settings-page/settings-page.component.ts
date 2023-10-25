import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
  constructor(private apiService: ApiService, private titleService:Title) {
    this.titleService.setTitle("Настройки" + apiService.title);
  }
}
