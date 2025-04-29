"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createColumns } from "./columns";
import Category from "@/app/types/Category";
import { CustomButton } from "@/app/admin/components/button";
import { Pencil, Trash2 } from "lucide-react";

interface CategoryTableProps {
  data: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTable({ data, onEdit, onDelete }: CategoryTableProps) {
  const columns = createColumns(onEdit, onDelete);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id || (column as any).accessorKey}>
                {column.header as string}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.href}</TableCell>
              <TableCell>{category.alt}</TableCell>
              <TableCell>
                {category.img && (
                  <img
                    src={category.img}
                    alt={category.alt}
                    className="h-10 w-10 object-cover rounded-md"
                  />
                )}
              </TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
