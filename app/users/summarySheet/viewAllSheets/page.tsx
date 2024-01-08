'use client'
import { useEffect, useState } from "react"
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import axios, { AxiosResponse } from "axios";
import { DataTable } from "@/app/components/ui/data-table";
import { columns } from "./columns";

export default function Page() {
    const [Data, setData] = useState();
    async function getSummarySheets() {
        axios.post("/api/getAllSheets", { method: "notStatic" })
            .then((response: AxiosResponse) => {
                setData(response.data.Sheets);
            })
            .catch((error: any) => console.log(error));
    }

    useEffect(() => {
        const fetchData = async () => {
            await getSummarySheets();
        }

        fetchData();
    }, [])
    return (
        <>
            {
                Data &&
                <div>
                    <Navbar />
                    <div className="container">
                        <DataTable data={Data} columns={columns} />
                    </div>
                    <Footer />
                </div>
            }
        </>
    )
}