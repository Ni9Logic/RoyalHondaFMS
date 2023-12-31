'use client'
import { DataTable } from "@/app/components/ui/data-table";
import Footer from "@/app/users/Footer";
import Navbar from "@/app/users/Navbar";
import { columns } from "./salesColumns";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Invoice } from "@/types";
import Loader from "@/app/components/ui/loader";

export default function PAGE() {
    const [Data, setData] = useState<Invoice[]>();

    const fetchAllInvoice = async () => {
        axios.post('/api/getAllInvoices', { method: "notStatic" })
            .then((response: AxiosResponse) => setData(response.data.Message))
            .catch((error: any) => console.log(error))
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchAllInvoice();
        }

        fetchData();

    }, [])
    return (
        Data ?
            (
                <div>
                    <Navbar />
                    <div className="container">
                        <DataTable data={Data} columns={columns} />
                    </div>
                    <Footer />
                </div>
            ) : (
                <div>
                    <Navbar />
                    <div className="h-[80vh] w-full flex items-center justify-center">
                        <div className="flex items-center justify-center flex-col">
                            <Loader isLoading={Data ? false : true} />
                            <p className="items-center justify-center text-center">Please Wait...</p>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
    )
}