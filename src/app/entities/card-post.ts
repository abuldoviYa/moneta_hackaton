export class CardPost {
  userId: number
  bankName: string
  balance: number

  constructor(userId: number, bankName: string, balance: number) {
    this.userId = userId;
    this.bankName = bankName;
    this.balance = balance;
  }
}
