import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Switch,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/app/components/ui/Input";
import { useState } from "react";
import Colors from "@/app/types/Colors";

const colorSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  hex: z
    .string()
    .min(1, "El código hexadecimal es requerido")
    .or(z.array(z.string())),
  multicolor: z.boolean().default(false),
});

type ColorFormData = z.infer<typeof colorSchema>;

interface ColoresDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ColorFormData) => void;
  initialData?: Colors;
}

export function ColoresDrawer({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ColoresDrawerProps) {
  const [isMulticolor, setIsMulticolor] = useState(
    initialData?.multicolor || false
  );
  const [hexColors, setHexColors] = useState<string[]>(
    Array.isArray(initialData?.hex) ? initialData.hex : [initialData?.hex || ""]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: initialData?.name || "",
      hex: initialData?.hex || "",
      multicolor: initialData?.multicolor || false,
    },
  });

  const handleFormSubmit = (data: ColorFormData) => {
    const formData = {
      ...data,
      hex: isMulticolor ? hexColors : data.hex,
    };
    onSubmit(formData);
  };

  const handleAddColor = () => {
    setHexColors([...hexColors, ""]);
  };

  const handleRemoveColor = (index: number) => {
    const newColors = hexColors.filter((_, i) => i !== index);
    setHexColors(newColors);
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...hexColors];
    newColors[index] = value;
    setHexColors(newColors);
    setValue("hex", newColors);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="2xl"
      hideCloseButton
      className="bg-secondary-500"
    >
      <DrawerContent>
        <DrawerHeader className="border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? "Editar Color" : "Nuevo Color"}
          </h2>
        </DrawerHeader>
        <DrawerBody>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Nombre
              </label>
              <Input
                placeholder="Nombre del color"
                {...register("name")}
                error={errors.name?.message}
                className="bg-white/5 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-white mb-1">
                <span>Multicolor</span>
                <Switch
                  isSelected={isMulticolor}
                  onValueChange={(checked: boolean) => {
                    setIsMulticolor(checked);
                    setValue("multicolor", checked);
                  }}
                />
              </label>
            </div>

            {!isMulticolor ? (
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Color (HEX)
                </label>
                <div className="flex gap-2">
                  <div
                    className="h-10 w-10 bg-white/5 rounded-lg"
                    style={{ backgroundColor: hexColors[0] || "#000000" }}
                  ></div>
                  <Input
                    placeholder="#000000"
                    {...register("hex", {
                      onChange: (e) => {
                        handleColorChange(0, e.target.value);
                      },
                    })}
                    error={errors.hex?.message}
                    className="bg-white/5 text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white mb-1">
                  Colores (HEX)
                </label>
                {hexColors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <div
                      className="h-10 w-10 bg-white/5 rounded-lg"
                      style={{ backgroundColor: color || "#000000" }}
                    ></div>
                    <Input
                      placeholder="#000000"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="bg-white/5 text-white placeholder:text-white/50"
                    />
                    {index > 0 && (
                      <Button
                        variant="flat"
                        onPress={() => handleRemoveColor(index)}
                        className="bg-red-500 text-white px-2 rounded-lg"
                        isIconOnly
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="flat"
                  onPress={handleAddColor}
                  className="bg-white/10 text-white px-4 py-2 rounded-lg mt-2"
                  disableRipple
                >
                  Agregar Color
                </Button>
              </div>
            )}
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
