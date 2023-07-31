export type ProductData = {
  id: number;
  slug: string;
  name?: string;
  ar_name?: string;
  title?: string;
  ar_title?: string;
  price: number;
  attributes: string;
  is_on_sale: boolean;
  variations: string;
  regular_price: number;
  main_image: string;
  main_image_small: string;
  sale_price: number;
  thumbnail: string;
  category: string;
  type: string;
};

export type ErrorResponse = {
  status: string;
  msg: string;
};

export type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  formatCurrency: (value: number, currency: string) => string;
};
