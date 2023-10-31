import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable()
export class ChatService {
  audioFile = new Audio(
    "assets/sounds/success.mp3"
  );

  constructor(private translate: TranslateService) {
  }

  conversation = new Subject<Message[]>();

  msgCounter = 0

  getBotAnswer(msg: string) {
    const userMessage = new Message("user", msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message("bot", this.getBotMessage(msg));

    setTimeout(() => {
      this.playFile();
      this.conversation.next([botMessage]);
    }, 1500);
  }

  playFile() {
    this.audioFile.play();
  }


  getBotMessage(question: string) {
    if (this.msgCounter > 0 ){
      return this.translate.instant('callOperator')
    }
    this.msgCounter++;
    return this.translate.instant('welcomeChat')
  }

}
