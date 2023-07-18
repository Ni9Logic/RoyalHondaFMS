import {columns} from "./columns"
import {DataTable} from "./data-table"
import getUserTransactions from "@/app/actions/getUserTransactions";

export default async function page() {
    const data = await getUserTransactions;
    return (
        <>
            {/* @ts-ignore */}
            <DataTable columns={columns} data={data}/>
        </>
    )
}