import CustomImage from "./CustomImage";
import Colors from "./Colors";

export default interface Product {
  id: string;
  name: string;
  description: string;
  category?: string;
  colors?: string[];
  images?: File[];
  newImages?: File[];
  existingImages?: string[];
  corte?: string;
  suela?: string;
  plantilla?: string;
  forro?: string;
  corrida?: string;
  construccion?: string;
  casco?: string;
  category_id?: string;
}
