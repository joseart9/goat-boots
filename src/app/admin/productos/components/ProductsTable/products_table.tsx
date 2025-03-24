import React from "react";
import Table from "@/app/components/ui/Table";
import { columns } from "./columns";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

interface ProductsTableProps {
  rows: any[];
}

export default function ProductsTable({ rows }: ProductsTableProps) {
  return <Table columns={columns} rows={rows} />;
}
