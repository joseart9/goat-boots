import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Spinner,
} from "@heroui/react";
import Input from "@/app/components/ui/Input";
import Select, { SelectItem } from "@/app/components/ui/Select";
import { useEffect, useState } from "react";
import useCategories from "@/app/hooks/useCategorias";
import ImageUpload from "@/app/components/imgUpload";
import { useForm } from "react-hook-form";
import Product from "@/app/types/Product";
import { useColors } from "@/app/hooks/use-colors";

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  initialData?: Product;
  imagesFromDb: any[];
}

export function ProductDrawer({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
  imagesFromDb,
}: ProductDrawerProps) {
  const { data: categories } = useCategories();
  const [images, setImages] = useState<string[]>([null as any]);
  const [savedImages, setSavedImages] = useState<any[]>([]);
  const { colors, loading, error } = useColors();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      corte: "",
      colores: [] as string[],
      suela: "",
      plantilla: "",
      forro: "",
      corrida: "",
      construccion: "",
      casco: "",
    },
  });

  const categoryId = watch("categoryId");
  const colores = watch("colores");

  useEffect(() => {
    if (initialData) {
      // Set form values from initialData
      Object.keys(initialData).forEach((key) => {
        if (key !== "images" && key !== "color_id") {
          setValue(key as any, initialData[key as keyof Product]);
        }
      });

      // set colores - handle both string and array cases
      if (initialData.color_id) {
        const colorIds = Array.isArray(initialData.color_id)
          ? initialData.color_id
          : [initialData.color_id];
        setValue("colores", colorIds);
      }

      // Set images if they exist
      if (imagesFromDb && imagesFromDb.length > 0) {
        setSavedImages(imagesFromDb);
      }

      // Set categoryId
      setValue("categoryId", initialData.category_id || "");
    } else {
      // Reset form when creating new product
      reset();
      setSavedImages([]);
    }
  }, [initialData, setValue, reset, imagesFromDb]);

  const handleFormSubmit = (data: any) => {
    const formData = {
      ...data,
      images: images.filter((img) => img !== null),
      savedImages: savedImages,
    };
    onSubmit(formData);
  };

  const handleUploadComplete = (url: string) => {
    setImages((prev) => [...prev.filter((img) => img !== null), url]);
  };

  // Log all data for debugging
  //  ("Images:", images);
  //  ("Saved images:", savedImages);
  //  ("Initial data:", initialData);
  //  ("Category ID:", categoryId);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="3xl"
      hideCloseButton
      className="bg-secondary-500"
    >
      <DrawerContent>
        <DrawerHeader className="border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? "Editar Producto" : "Nuevo Producto"}
          </h2>
        </DrawerHeader>
        <DrawerBody>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Nombre
              </label>
              <Input
                placeholder="Ingrese el nombre del producto"
                {...register("name", { required: "El nombre es requerido" })}
                error={errors.name?.message as string}
                className="w-full bg-white/10 text-white border-white/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Descripción
              </label>
              <Input
                placeholder="Ingrese la descripción del producto"
                asTextarea
                {...register("description", {
                  required: "La descripción es requerida",
                })}
                error={errors.description?.message as string}
                className="w-full bg-white/10 text-white border-white/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Categoría
              </label>
              <Select
                placeholder="Seleccione una categoría"
                value={categoryId}
                onChange={(value) => setValue("categoryId", value as string)}
                error={errors.categoryId?.message as string}
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
                Imágenes
              </label>
              <ImageUpload
                images={images}
                setImages={setImages}
                imagesSaved={savedImages}
                setImagesSaved={setSavedImages}
                onUploadComplete={handleUploadComplete}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Corte
                </label>
                <Input
                  placeholder="Ingrese el corte"
                  asTextarea
                  {...register("corte")}
                  className="w-full bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Colores
                </label>
                <Select
                  placeholder="Seleccione un color"
                  value={watch("colores") || []}
                  onChange={(value) =>
                    setValue("colores", Array.isArray(value) ? value : [])
                  }
                  error={errors.colores?.message as string}
                  className="w-full"
                  multiple
                >
                  {colors?.map((color) => {
                    const hexColors = color.multicolor
                      ? JSON.parse(color.hex as string)
                      : [color.hex];

                    return (
                      <SelectItem key={color.id} value={color.id || ""}>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {hexColors.map((hex: string, index: number) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: hex }}
                              />
                            ))}
                          </div>
                          {color.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Suela
                </label>
                <Input
                  placeholder="Ingrese la suela"
                  asTextarea
                  {...register("suela")}
                  className="w-full bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Plantilla
                </label>
                <Input
                  placeholder="Ingrese la plantilla"
                  asTextarea
                  {...register("plantilla")}
                  className="w-full bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Forro
                </label>
                <Input
                  placeholder="Ingrese el forro"
                  asTextarea
                  {...register("forro")}
                  className="w-full bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Corrida
                </label>
                <Input
                  placeholder="Ingrese la corrida"
                  asTextarea
                  {...register("corrida")}
                  className="w-full bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Construcción
                </label>
                <Input
                  placeholder="Ingrese la construcción"
                  asTextarea
                  {...register("construccion")}
                  className="w-full bg-white/10 text-white border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Casco
                </label>
                <Input
                  placeholder="Ingrese el casco"
                  asTextarea
                  {...register("casco")}
                  className="w-full bg-white/10 text-white border-white/20"
                />
              </div>
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
              onClick={handleSubmit(handleFormSubmit)}
              className="text-white rounded-lg bg-primary-500 py-2 px-4 w-52"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" /> Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
