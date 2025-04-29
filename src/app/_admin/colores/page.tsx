"use client";
import { Button } from "@heroui/react";
import { ColorsTable } from "./ColoresTable/colores-table";
import { ColoresDrawer } from "./ColoresDrawer/colores-drawer";
import { useDisclosure } from "@heroui/react";
import Colors from "@/app/types/Colors";
import { createColor } from "@/server/actions/color";
import { useColors } from "@/app/hooks/use-colors";

export default function AdminColores() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colors, loading } = useColors();

  const handleCreateColor = async (color: Colors) => {
    const colorToCreate = {
      name: color.name,
      hex: color.hex,
      multicolor: color.multicolor,
    };

    await createColor(colorToCreate);
    onClose();
  };

  const setRowId = (rowId: string) => {
    console.log(rowId);
  };

  console.log(colors);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Colores</h1>
        <Button
          color="success"
          onPress={onOpen}
          className="text-white"
          disableRipple
        >
          Nuevo Color
        </Button>
      </div>
      <ColorsTable data={colors || []} handleEditRow={setRowId} />
      <ColoresDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateColor}
        loading={loading}
      />
    </div>
  );
}
