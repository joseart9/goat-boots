import CustomImage from "./CustomImage";

export default interface Product {
  price?: number;
  name?: string;
  description?: string;
  images?: CustomImage[];
  id: string;
  stock?: number;
  category?: string;
}
