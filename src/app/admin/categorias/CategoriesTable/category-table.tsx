import Table from "@/app/components/ui/Table";
import { columns } from "./columns";
import Categoria from "@/app/types/Categoria";

interface CategoryTableProps {
  data: Categoria[];
}

export function CategoryTable({ data }: CategoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table columns={columns} rows={data} />
    </div>
  );
}
