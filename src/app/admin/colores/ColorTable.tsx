import { CustomTable } from "@/app/admin/components/table/table";
import { CustomButton } from "@/app/admin/components/button";
import { Pencil, Trash2 } from "lucide-react";
import Colors from "@/app/types/Colors";

interface ColorTableProps {
  data: Colors[];
  onEdit: (color: Colors) => void;
  onDelete: (color: Colors) => void;
}

export function ColorTable({ data, onEdit, onDelete }: ColorTableProps) {
  const getHexColors = (hex: string | string[] | undefined) => {
    if (!hex) return [];
    if (Array.isArray(hex)) return hex;
    try {
      return JSON.parse(hex);
    } catch {
      return [hex];
    }
  };

  const columns = [
    {
      header: "Nombre",
      accessorKey: "name" as keyof Colors,
    },
    {
      header: "Color",
      accessorKey: "hex" as keyof Colors,
      cell: (row: Colors) => {
        const hexColors = getHexColors(row.hex);
        return (
          <div className="flex items-center gap-2">
            {row.multicolor && hexColors.length === 2 ? (
              <div className="relative w-6 h-6">
                <div
                  className="absolute inset-0 rounded-full border overflow-hidden"
                  style={{
                    background: `linear-gradient(to right, ${hexColors[0]} 0%, ${hexColors[0]} 50%, ${hexColors[1]} 50%, ${hexColors[1]} 100%)`,
                  }}
                />
              </div>
            ) : (
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: hexColors[0] }}
              />
            )}
          </div>
        );
      },
    },
    {
      header: "Acciones",
      accessorKey: "actions" as keyof Colors,
      cell: (row: Colors) => (
        <div className="flex justify-end gap-2">
          <CustomButton
            variant="default"
            size="icon"
            onClick={() => onEdit(row)}
          >
            <Pencil className="h-4 w-4 text-black dark:text-white" />
          </CustomButton>
          <CustomButton
            variant="default"
            size="icon"
            onClick={() => onDelete(row)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </CustomButton>
        </div>
      ),
    },
  ];

  return <CustomTable data={data} columns={columns} />;
}
