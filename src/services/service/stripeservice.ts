import Stripe from 'stripe';
import { envs } from '../../config/envs';
import { 
  CreatePaymentIntentRequest, 
  CreatePaymentIntentResponse,
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  Product 
} from  './index'

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(envs.STRIPE_SECRET_KEY!, {
      apiVersion: '1.0.0.0' as any,
    });
  }

  /**
   * Crear Payment Intent para pagos de una sola vez
   */
  async createPaymentIntent(
    data: CreatePaymentIntentRequest
  ): Promise<CreatePaymentIntentResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: data.amount, // Monto en centavos
        currency: data.currency || 'usd',
        description: data.description,
        metadata: data.metadata || {},
        automatic_payment_methods: {
          enabled: true,
        },
        ...(data.customerEmail && {
          receipt_email: data.customerEmail,
        }),
      });

      return {
        clientSecret: paymentIntent.client_secret!,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        id: paymentIntent.id,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  /**
   * Crear sesión de Checkout para flujo de pago completo
   */
  async createCheckoutSession(
    data: CreateCheckoutSessionRequest
  ): Promise<CreateCheckoutSessionResponse> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: data.priceId,
            quantity: data.quantity || 1,
          },
        ],
        mode: 'payment',
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        customer_email: data.customerEmail,
        metadata: data.metadata || {},
      });

      return {
        sessionId: session.id,
        url: session.url!,
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  /**
   * Crear producto y precio en Stripe
   */
  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    currency: string;
  }): Promise<{ productId: string; priceId: string }> {
    try {
      // Crear producto
      const product = await this.stripe.products.create({
        name: productData.name,
        description: productData.description,
      });

      // Crear precio
      const price = await this.stripe.prices.create({
        product: product.id,
        unit_amount: productData.price, // en centavos
        currency: productData.currency || 'usd',
      });

      return {
        productId: product.id,
        priceId: price.id,
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  /**
   * Recuperar un Payment Intent
   */
  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      throw new Error('Failed to retrieve payment intent');
    }
  }

  /**
   * Confirmar un pago
   */
  async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.confirm(paymentIntentId);
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  /**
   * Reembolsar un pago
   */
  async refundPayment(paymentIntentId: string): Promise<Stripe.Refund> {
    try {
      return await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
    } catch (error) {
      console.error('Error refunding payment:', error);
      throw new Error('Failed to refund payment');
    }
  }

  /**
   * Manejar webhook de Stripe
   */
  async handleWebhookEvent(payload: Buffer, signature: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      return event;
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      throw new Error('Invalid webhook signature');
    }
  }

  /**
   * Crear cliente en Stripe
   */
  async createCustomer(email: string, name?: string): Promise<string> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });

      return customer.id;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }

}