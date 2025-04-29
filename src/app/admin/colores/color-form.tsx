"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CustomButton } from "@/app/admin/components/button";
import { CustomInput } from "@/app/admin/components/input";
import { Switch } from "@/app/admin/components/switch/switch";
import Colors from "@/app/types/Colors";

const colorSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  hex: z.union([
    z.string().min(1, "El color es requerido"),
    z.array(z.string().min(1, "El color es requerido")),
  ]),
  multicolor: z.boolean().default(false),
});

type ColorFormValues = z.infer<typeof colorSchema>;

interface ColorFormProps {
  colorId?: string;
  onSubmit: (data: Omit<Colors, "id">) => void;
  isLoading?: boolean;
}

export function ColorForm({ colorId, onSubmit, isLoading }: ColorFormProps) {
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      hex: "",
      multicolor: false,
    },
  });

  const handleSubmit = (data: ColorFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div className="space-y-2">
        <CustomInput
          label="Nombre"
          {...form.register("name")}
          placeholder="Nombre del color"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <CustomInput
          label="Hex"
          {...form.register("hex")}
          placeholder="#000000"
        />
        {form.formState.errors.hex && (
          <p className="text-sm text-red-500">
            {form.formState.errors.hex.message}
          </p>
        )}
      </div>

      <Switch
        {...form.register("multicolor")}
        checked={form.watch("multicolor")}
        label="Multicolor"
        description="Activar si el color tiene múltiples tonos"
      />

      <CustomButton
        className="bg-primary-500 text-white dark:text-white font-semibold"
        variant="default"
        type="submit"
        isLoading={isLoading}
      >
        {colorId ? "Actualizar" : "Crear"}
      </CustomButton>
    </form>
  );
}
