export class Card {


  constructor(userId: number, country: string, bank: string, cardNumber: string, balance: number, system: string) {
    this.country = country;
    this.bankName = bank;
    this.cardNumber = cardNumber;
    this.balance = balance;

    this.paymentSystem = system;
    this.userId = userId;
  }
  country: string
  bankName: string
  cardNumber: string
  balance: number

  paymentSystem: string
  userId: number
}
