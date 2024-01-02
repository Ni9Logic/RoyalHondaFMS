'use client'
import { useEffect, useState } from "react";
import { columns } from "./allUserTablesColumns";
import { DataTable } from "./data-table";
import axios from "axios";


// Fetch the data using async function
const AllTables = () => {
    const [Data, setData] = useState<any>('');
    const getAllUsers = async () => {
        try {
            const response = await axios.get('/api/getAllJobCards');
            setData(response?.data?.jobCards);
        } catch (error: any) {
            console.log('Error Fetching Data', error)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllUsers();
                // Additional code after the fetch operation if needed
            } catch (error) {
                console.error('Error fetching serial number:', error);
                // Handle the error as needed
            }
        };

        fetchData(); // Call the async function immediately

        // If you have a cleanup function (optional)
        return () => {
            // Code to run on unmount (cleanup)
        };
    }, [])
    return (
        <>
            <div>
                <DataTable columns={columns} data={Data} />
            </div>
        </>
    )
}

export default AllTables;