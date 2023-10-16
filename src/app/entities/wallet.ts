import {state} from "@angular/animations";

export class Wallet {



  id: number;
  userId: number;
  centralBank: string; // Assuming it refers to the central bank system, adjust if needed
  country: string; // Assuming it's the country code, adjust if needed
  digitalWalletNumber: number;
  balance: number;
  state: string
  currency: string;
  isAgreement: boolean;
  dateCreated: string;


  constructor(id: number, userId: number, centralBank: string, country: string, digitalWalletNumber: number, balance: number, state: string, currency: string, isAgreement: boolean, dateCreated: string) {
    this.id = id;
    this.userId = userId;
    this.centralBank = centralBank;
    this.country = country;
    this.digitalWalletNumber = digitalWalletNumber;
    this.balance = balance;
    this.state = state;
    this.currency = currency;
    this.isAgreement = isAgreement;
    this.dateCreated = dateCreated;
  }
}
