import Table from "@/app/components/ui/Table";
import { columns } from "./columns";
import Colors from "@/app/types/Colors";

interface ColorsTableProps {
  data: Colors[];
  handleEditRow: (id: string) => void;
}

export function ColorsTable({ data, handleEditRow }: ColorsTableProps) {
  return (
    <div className="rounded-md border">
      <Table columns={columns} rows={data} handleEditRow={handleEditRow} />
    </div>
  );
}
