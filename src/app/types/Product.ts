import CustomImage from "./CustomImage";
import Colors from "./Colors";

export default interface Product {
  price?: number;
  name?: string;
  description?: string;
  images?: CustomImage[];
  id: string;
  stock?: number;
  category?: string;
  // Especificaciones
  corte?: string;
  colores?: Colors[];
  suela?: string;
  plantilla?: string;
  forro?: string;
  corrida?: string;
  construccion?: string;
  casco?: string;
}
