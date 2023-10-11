export class Card {
  constructor(country: string, bank: string, cardNumber: string, balance: number, type: string, system: string) {
    this.country = country;
    this.bank = bank;
    this.cardNumber = cardNumber;
    this.balance = balance;
    this.type = type;
    this.system = system;
  }
  country: string
  bank: string
  cardNumber: string
  balance: number
  type: string
  system: string

}
