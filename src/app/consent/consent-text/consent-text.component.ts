import {Component, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-consent-text',
  templateUrl: './consent-text.component.html',
  styleUrls: ['./consent-text.component.scss']
})
export class ConsentTextComponent {
  @Input()
  language: string | null
  constructor(private translate: TranslateService) {
    this.language = localStorage.getItem('lang')
  }

}
