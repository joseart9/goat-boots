import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import Input from "@/app/components/ui/Input";
import Select, { SelectItem } from "@/app/components/ui/Select";
import { useState } from "react";
import useCategories from "@/app/hooks/useCategorias";
import ImageUpload from "@/app/components/imgUpload";

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface ProductFormData {
  name: string;
  description: string;
  categoryId: string;
  corte: string;
  suela: string;
  plantilla: string;
  forro: string;
  corrida: string;
  construccion: string;
  casco: string;
  images: string[];
}

export function ProductDrawer({
  isOpen,
  onClose,
  onSubmit,
}: ProductDrawerProps) {
  const { data: categories } = useCategories();
  const [images, setImages] = useState<string[]>([null as any]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    categoryId: "",
    corte: "",
    suela: "",
    plantilla: "",
    forro: "",
    corrida: "",
    construccion: "",
    casco: "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleUploadComplete = (images: string) => {
    formData.images.push(images);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="lg"
      hideCloseButton
      className="bg-secondary-500"
    >
      <DrawerContent>
        <DrawerHeader className="border-b">
          <h2 className="text-xl font-semibold">Nuevo Producto</h2>
        </DrawerHeader>
        <DrawerBody>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Nombre
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese el nombre del producto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Descripción
              </label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese la descripción del producto"
                asTextarea
              />
            </div>

            <h3 className="text-sm font-medium text-white mb-1">Imagenes</h3>
            <ImageUpload
              images={images}
              setImages={setImages}
              isSingleImage={false}
              onUploadComplete={handleUploadComplete}
            />

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Categoría
              </label>
              <Select
                placeholder="Seleccione una categoría"
                value={formData.categoryId}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, categoryId: value }))
                }
                className="w-full"
              >
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Corte
              </label>
              <Input
                name="corte"
                value={formData.corte}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese el corte"
                asTextarea
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Suela
              </label>
              <Input
                name="suela"
                value={formData.suela}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese la suela"
                asTextarea
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Plantilla
              </label>
              <Input
                name="plantilla"
                value={formData.plantilla}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese la plantilla"
                asTextarea
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Forro
              </label>
              <Input
                name="forro"
                value={formData.forro}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese el forro"
                asTextarea
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Corrida
              </label>
              <Input
                name="corrida"
                value={formData.corrida}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese la corrida"
                asTextarea
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Construcción
              </label>
              <Input
                name="construccion"
                value={formData.construccion}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese la construcción"
                asTextarea
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Casco
              </label>
              <Input
                name="casco"
                value={formData.casco}
                onChange={handleChange}
                className="w-full"
                placeholder="Ingrese el casco"
                asTextarea
              />
            </div>
          </form>
        </DrawerBody>
        <DrawerFooter className="border-t">
          <div className="flex justify-end space-x-2">
            <Button
              variant="flat"
              onPress={onClose}
              className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Cancelar
            </Button>
            <button
              onClick={handleSubmit}
              className="text-white rounded-lg bg-primary-500 py-2 px-4"
            >
              Guardar
            </button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
