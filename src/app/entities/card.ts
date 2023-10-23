export class Card {


  constructor(userId: number, country: string, bank: string, cardNumber: string, balance: number, system: string, id: number) {
    this.id = id;
    this.country = country;
    this.bankName = bank;
    this.cardNumber = cardNumber;
    this.balance = balance;

    this.paymentSystem = system;
    this.userId = userId;
  }

  id: number;
  country: string
  bankName: string
  cardNumber: string
  balance: number

  paymentSystem: string
  userId: number
}
