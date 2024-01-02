'use client'
import { useEffect, useState } from "react";
import { columns } from "./allUserTablesColumns";
import { DataTable } from "./data-table";
import axios from "axios";


const AllTables = () => {
    const [Data, setData] = useState<any>('');
    const [loading, setLoading] = useState(true);

    const getAllJobCards = async () => {
        try {
            const response = await axios.get('/api/getAllJobCards');
            setData(response?.data?.jobCards);
        } catch (error: any) {
            console.log('Error Fetching Data', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllJobCards();
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
    }, []); // Empty dependency array ensures it runs only on mount

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataTable columns={columns} data={Data} />
            )}
        </div>
    );
}

export default AllTables;
