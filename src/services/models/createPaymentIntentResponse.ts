
export interface CreatePaymentIntentResponse {
  clientSecret: string;
  amount: number;
  currency: string;
  id: string;
}