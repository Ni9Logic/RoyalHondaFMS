import {Transaction, columns} from "./columns"
import {DataTable} from "./data-table"
import getUserTransactions from "@/app/actions/getUserTransactions";

const getData = async () => {
    return getUserTransactions;
}

export default async function page() {
    const data = await getUserTransactions;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}