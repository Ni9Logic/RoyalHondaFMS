'use client'
import { useEffect, useState } from "react";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import axios from "axios";
import { DataTable } from "@/app/components/ui/data-table";
import { columns } from "./estimateColumns";

export default function PAGE() {
    const [Data, setData] = useState<any>('');
    const getAllEstimates = async () => {
        try {
            const response = await axios.post('/api/getAllEstimates', {method: "notStatic"});
            setData(response?.data?.Estimates);
        } catch (error: any) {
            console.log('Error Fetching Data', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllEstimates();
            } catch (error) {
                console.error('Error fetching serial number:', error);
            }
        };

        fetchData();
    }, [])
    return (
        <>
                    
            <Navbar />
            <DataTable data={Data} columns={columns} />
            <Footer />
        </>
    )
}