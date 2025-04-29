import Table from "@/app/components/ui/Table";
import { columns } from "./columns";
import Categoria from "@/app/types/Categoria";

interface CategoryTableProps {
  data: Categoria[];
  handleEditRow: (id: string) => void;
}

export function CategoryTable({ data, handleEditRow }: CategoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table columns={columns} rows={data} handleEditRow={handleEditRow} />
    </div>
  );
}
