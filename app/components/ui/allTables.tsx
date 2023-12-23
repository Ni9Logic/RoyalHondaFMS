'use client'
import { useState } from "react";
import { columns } from "./allUserTablesColumns";
import { DataTable } from "./data-table";


// Fetch the data using async function
const AllTables = () => {
    const [Data, setData] = useState<any>(null);
    const getAllUsers = async () => {

    }
    return (
        <>
            <DataTable columns={columns} data={Data} />
        </>
    )
}

export default AllTables;