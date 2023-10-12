import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() {
  }

  addToHistory(walletFrom: any, walletTo: any, amountMinus: number, amountPlus:number ): void {
    let localHistory = []
    let date = Date.now();
    let historyItem: any
    if(!walletFrom.walletNumber && !walletFrom.walletNumber){
      historyItem = {date: date, from : walletFrom.cardNumber, to: walletTo.cardNumber, amountMinus: amountMinus, amountPlus: amountPlus}
    } else if(!walletFrom.cardNumber && !walletFrom.cardNumber) {
      historyItem = {date: date, from : walletFrom.walletNumber, to: walletTo.walletNumber, amountMinus: amountMinus, amountPlus: amountPlus}
    }

    if(!walletFrom.walletNumber && !walletTo.walletNumber){
      historyItem = {date: date, from : walletFrom.cardNumber, to: walletTo.cardNumber, amountMinus: amountMinus, amountPlus: amountPlus}
    } else if(!walletFrom.cardNumber && !walletTo.cardNumber) {
      historyItem = {date: date, from : walletFrom.walletNumber, to: walletTo.walletNumber, amountMinus: amountMinus, amountPlus: amountPlus}
    } else if(!walletFrom.cardNumber && !walletTo.walletNumber) {
      historyItem = {date: date, from : walletFrom.walletNumber, to: walletTo.cardNumber, amountMinus: amountMinus, amountPlus: amountPlus}
    } else {
      //(!walletFrom.walletNumber && !walletFrom.cardNumber)
      historyItem = {date: date, from : walletFrom.cardNumber, to: walletTo.walletNumber, amountMinus: amountMinus, amountPlus: amountPlus}
    }

    if(localStorage.getItem("history")!=null){
      localHistory = JSON.parse(localStorage.getItem("history")!)
    }
    localHistory.push(historyItem)
    localStorage.setItem("history", JSON.stringify(localHistory));
  }

  getHistory() {
    return JSON.parse(localStorage.getItem("history")!)
  }
}
