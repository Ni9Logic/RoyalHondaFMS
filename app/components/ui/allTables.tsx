'use client'
import {useEffect, useState} from "react";
import {columns} from "./allUserTablesColumns";
import {DataTable} from "./data-table";
import axios from "axios";


// Fetch the data using async function
const AllTables = () => {
    const [Data, setData] = useState<any>('');
    const getAllUsers = async () => {
        // Sending post request so that our data doesn't get stale, and we get fresh data on each request
        try {
            const response = await axios.post('/api/getAllJobCards', {method: 'notStatic'});
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

        fetchData();
    }, [])
    return (
        <>
            <div>
                <DataTable columns={columns} data={Data}/>
            </div>
        </>
    )
}

export default AllTables;