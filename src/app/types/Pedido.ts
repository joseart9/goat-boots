import Product from "./Product";

export type Pedido = {
  id?: string;
  active: boolean;
  customer_name: string;
  customer_lastname: string;
  customer_phone: string;
  customer_email: string;
  products?: Product[];
  created_at?: string;
  updated_at?: string;
};
