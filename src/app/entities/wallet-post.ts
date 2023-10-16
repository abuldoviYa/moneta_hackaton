export class WalletPost {
  userId: number;
  centralBank: string;
  isAgreement: "true"

  constructor(userId: number, centralBank: string) {
    this.userId = userId;
    this.centralBank = centralBank;
    this.isAgreement = "true";
  }
}




