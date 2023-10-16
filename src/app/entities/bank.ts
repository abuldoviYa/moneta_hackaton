export class Bank {
  id: number
  bankName: string
  inn: string
  kpp: number
  ogrn: string
  country: string

  constructor(id: number, bankName: string, inn: string, kpp: number, ogrn: string, country: string) {
    this.id = id;
    this.bankName = bankName;
    this.inn = inn;
    this.kpp = kpp;
    this.ogrn = ogrn;
    this.country = country;
  }
}
