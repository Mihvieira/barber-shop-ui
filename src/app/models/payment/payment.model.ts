
export enum PaymentMethod {
  DEBIT_CARD = 'DEBIT_CARD',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
  PIX = 'PIX',
}

export class Payment {
  id: number |undefined;
  paymentMethod: PaymentMethod | undefined;
  date: Date | undefined;
  amount: number | undefined;
  clientId: number | undefined;
}
