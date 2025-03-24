import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/app/components/ui/Input";
import ImageUpload from "@/app/components/imgUpload/image-upload";
import { useState } from "react";
import { CustomImg } from "@/app/types/CustomImg";

const categorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  img: z.string().min(1, "La imagen es requerida"),
  href: z.string().min(1, "El enlace es requerido"),
  alt: z.string().min(1, "El texto alternativo es requerido"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CreateCategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
}

export function CreateCategoryDrawer({
  isOpen,
  onClose,
  onSubmit,
}: CreateCategoryDrawerProps) {
  const [images, setImages] = useState<File[]>([null as any]);
  const [imagesSaved, setImagesSaved] = useState<CustomImg[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const handleImageUpload = (url: string) => {
    setValue("img", url);
  };

  const handleFormSubmit = (data: CategoryFormData) => {
    onSubmit(data);
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
          <h2 className="text-xl font-semibold">Nueva Categoría</h2>
        </DrawerHeader>
        <DrawerBody>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Nombre
              </label>
              <Input
                placeholder="Nombre de la categoría"
                {...register("name")}
                error={errors.name?.message}
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Descripción
              </label>
              <Input
                placeholder="Descripción de la categoría"
                asTextarea
                {...register("description")}
                error={errors.description?.message}
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Imagen
              </label>
              <ImageUpload
                images={images}
                setImages={setImages}
                imagesSaved={imagesSaved}
                setImagesSaved={setImagesSaved}
                onUploadComplete={handleImageUpload}
                isSingleImage={true}
              />
              {errors.img && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.img.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Enlace
              </label>
              <div className="flex">
                <span className="bg-white/5 text-white placeholder:text-white/50 inline-flex items-center px-3 rounded-l-md border border-r-0 text-sm">
                  /catalogo/
                </span>
                <Input
                  placeholder="categoria"
                  {...register("href")}
                  error={errors.href?.message}
                  className="bg-white/5 text-white placeholder:text-white/50 rounded-l-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Texto alternativo
              </label>
              <Input
                placeholder="Texto alternativo"
                {...register("alt")}
                error={errors.alt?.message}
                className="bg-white/5 text-white placeholder:text-white/50"
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
              disableRipple
            >
              Cancelar
            </Button>
            <Button
              variant="flat"
              onPress={() => handleSubmit(handleFormSubmit)()}
              className="text-white rounded-lg bg-primary-500"
              disableRipple
            >
              Guardar
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
