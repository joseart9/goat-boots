import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";

interface TableProps {
  columns: any[];
  rows: any[];
  handleEditRow: (id: string) => void;
}

export default function TableComponent({
  columns,
  rows,
  handleEditRow,
}: TableProps) {
  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip className="capitalize" color="default" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar" className="text-black">
              <span
                onClick={() => handleEditRow(row.id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <RiEdit2Line />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdOutlineDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells"
      className="text-secondary-500"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item: any) => (
          <TableRow key={item.id || Math.random()}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
