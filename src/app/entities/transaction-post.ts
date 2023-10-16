export class TransactionPost {
  userId: number
  sourceAccountId: number
  targetAccountId: number
  amountTransferred: number
  currency: number
  isSourceWallet: string
  isTargetWallet:string

  constructor(userId: number, sourceAccountId: number, targetAccountId: number, amountTransferred: number, currency: number, isSourceWallet: string, isTargetWallet: string) {
    this.userId = userId;
    this.sourceAccountId = sourceAccountId;
    this.targetAccountId = targetAccountId;
    this.amountTransferred = amountTransferred;
    this.currency = currency;
    this.isSourceWallet = isSourceWallet;
    this.isTargetWallet = isTargetWallet;
  }
}
