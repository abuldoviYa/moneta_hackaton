export class Wallet {

  constructor(currency: string, walletNumber: string, balance: number) {
    this.currency = currency;
    this.walletNumber = walletNumber;
    this.balance = balance;
  }

  currency: string;
  walletNumber: string;
  balance: number;
}
