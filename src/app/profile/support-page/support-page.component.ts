import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.scss']
})
export class SupportPageComponent {
    constructor( private titleService:Title, private translate: TranslateService, private apiService: ApiService) {
      this.apiService.translateTitle('support').subscribe((translations: string[]) => {
        this.titleService.setTitle(translations[0]+ " | " +translations[1])
      })
    }
}
