import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable()
export class ChatService {
  audioFile = new Audio(
    "assets/sounds/success.mp3"
  );

  constructor() {
  }

  conversation = new Subject<Message[]>();



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

    return "Здравствуйте! Мы скоро Вам ответим!";
  }

}
