"use client";

import { CustomTable } from "@/app/admin/components/table/table";
import { CustomButton } from "@/app/admin/components/button";
import { Pencil, Trash2 } from "lucide-react";
import Product from "@/app/types/Product";

interface ProductsTableProps {
  data: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductsTable({ data, onEdit, onDelete }: ProductsTableProps) {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "name" as keyof Product,
      sortable: true,
    },
    {
      header: "Categoría",
      accessorKey: "category" as keyof Product,
      sortable: true,
    },
    {
      header: "Descripción",
      accessorKey: "description" as keyof Product,
      sortable: true,
    },
    {
      header: "Acciones",
      accessorKey: "actions" as keyof Product,
      cell: (row: Product) => (
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
