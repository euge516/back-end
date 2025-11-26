export interface CreateCheckoutSessionRequest {
  priceId: string;
  quantity?: number;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}