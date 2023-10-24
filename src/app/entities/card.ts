export class Card {


  constructor(userId: number, country: string, bank: string, cardNumber: string, balance: number, system: string, id: number, dateCreated: string) {
    this.id = id;
    this.country = country;
    this.bankName = bank;
    this.cardNumber = cardNumber;
    this.balance = balance;
    this.dateCreated = dateCreated;
    this.paymentSystem = system;
    this.userId = userId;
  }

  id: number;
  country: string
  bankName: string
  cardNumber: string
  balance: number
  dateCreated: string
  paymentSystem: string
  userId: number
}
