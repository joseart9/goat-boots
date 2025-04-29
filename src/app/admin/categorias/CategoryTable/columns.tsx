import { ColumnDef } from "@tanstack/react-table";
import { CustomButton } from "@/app/admin/components/button";
import { Pencil, Trash2 } from "lucide-react";
import Category from "@/app/types/Category";

export const createColumns = (
  onEdit: (category: Category) => void,
  onDelete: (category: Category) => void
): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "href",
    header: "Enlace",
  },
  {
    accessorKey: "alt",
    header: "Texto Alternativo",
  },
  {
    accessorKey: "img",
    header: "Vista Previa",
    cell: ({ row }) => {
      const img = row.getValue("img") as string;
      return img ? (
        <img
          src={img}
          alt={row.getValue("alt") as string}
          className="h-10 w-10 object-cover rounded-md"
        />
      ) : null;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex justify-end gap-2">
          <CustomButton
            variant="default"
            size="icon"
            onClick={() => onEdit(category)}
          >
            <Pencil className="h-4 w-4 text-black dark:text-white" />
          </CustomButton>
          <CustomButton
            variant="default"
            size="icon"
            onClick={() => onDelete(category)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </CustomButton>
        </div>
      );
    },
  },
];
