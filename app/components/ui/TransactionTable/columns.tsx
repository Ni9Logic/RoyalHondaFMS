import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/app/components/ui/button";

export type Transaction = {
    id: String,
    amount: number,
    time: string,
    accountHolder_email: string,
    Receipent_email: string,
    Transaction_Type: string,
}


//@ts-ignore
function SortingButton({column, btnName}) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(true)}
        >
            {btnName}
            <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
    )
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
        header: ({column}) => <SortingButton column={column} btnName='Time'/>
    },
    {
        accessorKey: "Receipent_email",
        header: "Receipent Email"
    },
    {
        accessorKey: "Amount",
        header: ({column}) => <SortingButton column={column} btnName='Amount' />
    },
    {
        accessorKey: "Transaction_Type",
        header: "Transaction Type"
    }
]