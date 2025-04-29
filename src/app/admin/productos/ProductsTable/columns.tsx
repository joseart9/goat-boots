"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Product from "@/app/types/Product";

export interface Column {
  header: string;
  accessorKey: keyof Product;
  cell?: (row: Product) => React.ReactNode;
}

export const columns: Column[] = [
  {
    header: "Categoría",
    accessorKey: "category",
  },
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Descripción",
    accessorKey: "description",
    cell: (row: Product) => (
      <div className="max-w-[300px] truncate">{row.description}</div>
    ),
  },
  {
    header: "Acciones",
    accessorKey: "id",
    cell: (row: Product) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Edit", row.id)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Delete", row.id)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
