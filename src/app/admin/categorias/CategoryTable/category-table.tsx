"use client";

import { CustomTable } from "@/app/admin/components/table/table";
import { CustomButton } from "@/app/admin/components/button";
import { Pencil, Trash2 } from "lucide-react";
import Category from "@/app/types/Category";

interface CategoryTableProps {
  data: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTable({ data, onEdit, onDelete }: CategoryTableProps) {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "name" as keyof Category,
      sortable: true,
    },
    {
      header: "Descripción",
      accessorKey: "description" as keyof Category,
      sortable: true,
    },
    {
      header: "URL",
      accessorKey: "href" as keyof Category,
      sortable: true,
    },
    {
      header: "Alt",
      accessorKey: "alt" as keyof Category,
      sortable: true,
    },
    {
      header: "Imagen",
      accessorKey: "img" as keyof Category,
      cell: (row: Category) =>
        row.img && (
          <img
            src={row.img}
            alt={row.alt}
            className="h-10 w-10 object-cover rounded-md"
          />
        ),
    },
    {
      header: "Acciones",
      accessorKey: "actions" as keyof Category,
      cell: (row: Category) => (
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
