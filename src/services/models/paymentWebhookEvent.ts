
export interface PaymentWebhookEvent {
  type: string;
  data: {
    object: any;
  };
}