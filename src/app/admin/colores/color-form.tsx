"use client";

import { useState, useEffect } from "react";
import { CustomButton } from "@/app/admin/components/button";
import { CustomInput } from "@/app/admin/components/input";
import { Switch } from "@/app/admin/components/switch/switch";
import Colors from "@/app/types/Colors";

interface ColorFormProps {
  colorId?: string;
  colorToEdit?: Colors;
  onSubmit: (data: Omit<Colors, "id">) => void;
  isLoading?: boolean;
}

export function ColorForm({
  colorId,
  colorToEdit,
  onSubmit,
  isLoading,
}: ColorFormProps) {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("");
  const [hex2, setHex2] = useState("");
  const [multicolor, setMulticolor] = useState(false);

  useEffect(() => {
    if (colorToEdit) {
      setName(colorToEdit.name || "");
      setMulticolor(colorToEdit.multicolor || false);

      // Handle hex colors
      if (colorToEdit.multicolor) {
        try {
          const hexColors =
            typeof colorToEdit.hex === "string"
              ? JSON.parse(colorToEdit.hex)
              : colorToEdit.hex;

          if (Array.isArray(hexColors) && hexColors.length === 2) {
            setHex(hexColors[0] || "");
            setHex2(hexColors[1] || "");
          } else {
            setHex("");
            setHex2("");
          }
        } catch {
          setHex("");
          setHex2("");
        }
      } else {
        setHex(typeof colorToEdit.hex === "string" ? colorToEdit.hex : "");
        setHex2("");
      }
    }
  }, [colorToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("El nombre es requerido");
      return;
    }

    if (!hex.trim()) {
      alert("El color es requerido");
      return;
    }

    if (multicolor && !hex2.trim()) {
      alert("El segundo color es requerido");
      return;
    }

    const formData = {
      name,
      hex: multicolor ? [hex, hex2] : hex,
      multicolor,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <CustomInput
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del color"
        />
      </div>

      <div className="space-y-2">
        {multicolor ? (
          <div className="space-y-4">
            <CustomInput
              label="Color 1"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#000000"
            />
            <CustomInput
              label="Color 2"
              value={hex2}
              onChange={(e) => setHex2(e.target.value)}
              placeholder="#000000"
            />
          </div>
        ) : (
          <CustomInput
            label="Hex"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#000000"
          />
        )}
      </div>

      <Switch
        checked={multicolor}
        onCheckedChange={setMulticolor}
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
