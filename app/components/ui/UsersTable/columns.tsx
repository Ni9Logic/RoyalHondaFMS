import {ColumnDef} from "@tanstack/react-table";

export type User = {
    id: string,
    email: string | null,
    fullname: string | null,
    phone: string | null,
    admin: boolean | null,
    Balance: number | null,
    accountType: string | null,
    createdAt: Date
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "Account ID"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "fullname",
        header: "Full Name"
    },
    {
        accessorKey: "admin",
        header: "Admin Status"
    },
    {
        accessorKey: "Balance",
        header: "Balance"
    },
    {
        accessorKey: "accountType",
        header: "Account Type"
    },
    {
        accessorKey: "phone",
        header: "Phone Number"
    },
    {
        accessorKey: "createdAt",
        header: "Created At"
    },
]