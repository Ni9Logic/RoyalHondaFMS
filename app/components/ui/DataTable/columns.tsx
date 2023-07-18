import {ColumnDef} from "@tanstack/react-table";

export type Transaction = {
    id: String,
    amount: number,
    time: string,
    accountHolder_email: string,
    Receipent_email: string,
    Transaction_Type: string,
}

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID"
    },
    {
        accessorKey: "AccountHolder_email",
        header: "Email"
    },

    {
        accessorKey: "Time",
        header: "Date"
    },
    {
        accessorKey: "Receipent_email",
        header: "Receipent Email"
    },
    {
        accessorKey: "Amount",
        header: "Amount"
    },
    {
        accessorKey: "Transaction_Type",
        header: "Transaction Type"
    }
]