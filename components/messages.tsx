"use client";

import dayjs from "dayjs";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

import { type MessagesQueryItem } from "@/queries/messages";

const columns: ColumnDef<MessagesQueryItem>[] = [
	{
		accessorFn: (row) => ({
			id: row.id,
		}),
		id: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => row.original.id,
	},
	{
		accessorFn: (row) => ({ body: row.body }),
		id: "body",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Body" />
		),
		cell: ({ row }) => row.original.body,
	},
	{
		accessorFn: (row) => ({ sender: row.sender }),
		id: "sender",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Sender" />
		),
		cell: ({ row }) => row.original.sender.first_name,
	},
	{
		accessorFn: (row) => ({ timestamp: row.timestamp }),
		id: "timestamp",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Timestamp" />
		),
		cell: ({ row }) => dayjs(row.original.timestamp).format("YYYY-MM-DD"),
	},
];

type Props = {
	messages: readonly MessagesQueryItem[];
};

export function Messages({ messages }: Props) {
  // console.log(messages);
	return <DataTable columns={columns} data={messages} rowHeight={65} />;
}
