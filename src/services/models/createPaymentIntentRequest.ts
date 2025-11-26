export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  description?: string;
  customerEmail?: string;
  metadata?: {
    orderId?: string;
    userId?: string;
    productId?: string;
  };
}