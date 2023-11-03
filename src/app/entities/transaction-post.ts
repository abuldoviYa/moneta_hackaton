export class TransactionPost {
  userId: number
  sourceId: number
  targetId: number
  amountTransferred: number
  currency: number
  isSourceWallet: boolean
  isTargetWallet:boolean

  constructor(userId: number, sourceAccountId: number, targetAccountId: number, amountTransferred: number, currency: number, isSourceWallet: string, isTargetWallet: string) {
    this.userId = userId;
    this.sourceId = sourceAccountId;
    this.targetId = targetAccountId;
    this.amountTransferred = amountTransferred;
    this.currency = currency;
    this.isSourceWallet = isSourceWallet == "true";
    this.isTargetWallet = isTargetWallet == "true";
  }
}
