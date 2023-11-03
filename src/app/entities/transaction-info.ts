export class TransactionInfo {
  id: number;
  userId: number;
  sourceId: number;
  targetId: number;
  amountTransferred: number;
  mcc: number;
  currency: string;
  description: string;
  isSourceWallet: boolean;
  isTargetWallet: boolean;
  isSuccessful: boolean;
  dateCreated: Date;


  constructor(id: number, userId: number, sourceAccountId: number, targetAccountId: number, amountTransferred: number, mcc: number, currency: string, description: string, isSourceWallet: boolean, isTargetWallet: boolean, isSuccessful: boolean, dateCreated: Date) {
    this.id = id;
    this.userId = userId;
    this.sourceId = sourceAccountId;
    this.targetId = targetAccountId;
    this.amountTransferred = amountTransferred;
    this.mcc = mcc;
    this.currency = currency;
    this.description = description;
    this.isSourceWallet = isSourceWallet;
    this.isTargetWallet = isTargetWallet;
    this.isSuccessful = isSuccessful;
    this.dateCreated = dateCreated;
  }
}
