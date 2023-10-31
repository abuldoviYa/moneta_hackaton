import { Component } from '@angular/core';
import {ChatService, Message} from "../chat.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: Message[] = [];
  value!: string;

  constructor(public chatService: ChatService, private translate: TranslateService) { }

  ngOnInit() {
    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }

  sendMessage() {
    if (this.value.trim() != '')
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

}
