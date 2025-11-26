export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD'| 'CAD' | 'CHF' | 'CNY' | 'SEK' | 'NZD'|'MXN';

export interface Product {
id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}