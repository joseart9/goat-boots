import { CustomTable } from "@/app/admin/components/table/table";
import { Pedido } from "@/app/types/Pedido";
import { CustomButton } from "@/app/admin/components/button/button";
import { Check, Eye } from "lucide-react";

interface PedidoTableProps {
  data: Pedido[];
  onView?: (pedido: Pedido) => void;
  onFinish?: (pedido: Pedido) => void;
  isFinishing?: boolean;
}

export function PedidoTable({
  data,
  onView,
  onFinish,
  isFinishing,
}: PedidoTableProps) {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "customer_name" as keyof Pedido,
    },
    {
      header: "Apellido",
      accessorKey: "customer_lastname" as keyof Pedido,
    },
    {
      header: "Teléfono",
      accessorKey: "customer_phone" as keyof Pedido,
    },
    {
      header: "Acciones",
      accessorKey: "actions" as keyof Pedido,
      cell: (row: Pedido) => (
        <div className="flex justify-end gap-2">
          <CustomButton
            variant="default"
            size="icon"
            onClick={onView ? () => onView(row) : undefined}
          >
            <Eye className="h-4 w-4 text-black dark:text-white" />
          </CustomButton>
          <CustomButton
            variant="default"
            size="icon"
            onClick={onFinish ? () => onFinish(row) : undefined}
            disabled={isFinishing}
          >
            <Check className="h-4 w-4 text-black dark:text-white" />
          </CustomButton>
        </div>
      ),
    },
  ];

  return <CustomTable data={data} columns={columns} />;
}
