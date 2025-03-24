import Table from "@/app/components/ui/Table";
import { columns } from "./columns";
import Categoria from "@/app/types/Categoria";

interface CategoryTableProps {
  data: Categoria[];
  setRowId: (id: string) => void;
}

export function CategoryTable({ data, setRowId }: CategoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table columns={columns} rows={data} setRowId={setRowId} />
    </div>
  );
}
