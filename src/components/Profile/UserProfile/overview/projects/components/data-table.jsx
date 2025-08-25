"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircleIcon,
  CheckIcon,
  CircleCheckIcon,
  Clock11Icon,
  Clock3,
  HourglassIcon,
  Icon,
} from "lucide-react";

export function DataTable({ data, custom, isLoading, teacher_data }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);

  const columns = [
    {
      header: "Teacher",
      accessorKey: "teacher",
    },
    {
      header: "Time & Date",
      accessorKey: "time_date",
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <Card>
      <CardHeader className="border-none mb-2">
        <DataTableToolbar table={table} custom={custom} />
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-t border-default-200 text-sm font-medium text-default-800 uppercase border-r"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center! w-full"
                >
                  <Skeleton className="w-full h-14 bg-gray-300" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row?.original?.id}>
                  <TableCell className="border border-default-200">
                    <div className="flex items-center gap-2">
                      <img
                        src={teacher_data?.image}
                        alt="teacher"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{teacher_data?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="border border-default-200">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{row?.original?.day}</span>
                      <span className="text-gray-500 ">|</span>
                      <div className="time font-medium">
                        <span className="text-main">
                          {row?.original?.start_time.split(":")[0] ?? "--"}
                        </span>
                        <span className="text-gray-500">:</span>
                        <span className="text-main">
                          {row?.original?.start_time.split(":")[1] ?? "--"}
                        </span>
                        <span className="text-gray-500"> - </span>
                        <span className="text-main">
                          {row?.original?.end_time.split(":")[0] ?? "--"}
                        </span>
                        <span className="text-gray-500">:</span>
                        <span className="text-main">
                          {row?.original?.end_time.split(":")[1] ?? "--"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border border-default-200">
                    <span className="font-medium flex">
                      {row?.original?.type ?? "Not Found"}
                    </span>
                  </TableCell>
                  <TableCell className="border border-default-200 text-center">
                    <span className="font-medium flex">
                      {row.original?.timer ? (
                        <div className="flex items-center gap-2">
                          <AlertCircleIcon className="size-8 text-red-500" />
                          <span>You Can Reserve This Session after </span>
                          <span className="text-main">
                            {row?.original?.timer}
                          </span>
                        </div>
                      ) : row?.original?.request ? (
                        <Clock3 className="size-8 text-yellow-500" />
                      ) : (
                        <CircleCheckIcon className="size-8 text-green-500" />
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center! w-full"
                >
                  No Sessions.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </CardContent>
    </Card>
  );
}
