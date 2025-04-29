"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomButton } from "@/app/admin/components/button";
import { Pencil, Trash2 } from "lucide-react";
import Product from "@/app/types/Product";

interface ProductsTableProps {
  data: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductsTable({ data, onEdit, onDelete }: ProductsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <CustomButton
                    variant="default"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="h-4 w-4 text-black dark:text-white" />
                  </CustomButton>
                  <CustomButton
                    variant="default"
                    size="icon"
                    onClick={() => onDelete(product)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </CustomButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
