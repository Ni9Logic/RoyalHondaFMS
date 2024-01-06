'use client'
import Footer from "@/app/users/Footer";
import Navbar from "@/app/users/Navbar";
import InputForm from "../Components/InputForm";
import { InvoiceData } from "@/app/lib/Resources";
import { SubmitHandler, useForm } from "react-hook-form";
import { EstimateRowObject, Invoice, SearchEstimate } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/ui/loader";
import InvoiceTable from "../Components/InvoiceTable";
import InvoiceSummary from "../Components/SalesInvoiceSummary";
import { v4 as uuidv4 } from "uuid";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
export default function PAGE() {
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerateSummary, setGenerateSummary] = useState(false);

    const [invoiceRows, setInvoiceRows] = useState<EstimateRowObject>({
        [uuidv4()]: {
            partNo: "",
            partDesc: "",
            partPrice: 0,
            partQty: 1,
            partTotalPrice: 0,
        },
        [uuidv4()]: {
            partNo: "",
            partDesc: "",
            partPrice: 0,
            partQty: 1,
            partTotalPrice: 0,
        },
        [uuidv4()]: {
            partNo: "",
            partDesc: "",
            partPrice: 0,
            partQty: 1,
            partTotalPrice: 0,
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<Invoice>({
        defaultValues: InvoiceData,
    })

    const onSubmit: SubmitHandler<Invoice> = async (Data: Invoice) => {
        setIsLoading(true);
        axios.post('/api/registerInvoice', { Data })
            .then((response: AxiosResponse) => toast.success(response?.data?.Message))
            .catch((error: AxiosResponse) => toast.error(error?.data?.Message))
            .finally(() => setIsLoading(false));
    }


    return (
        <div>
            <Navbar />
            <div className="flex justify-center flex-col items-center">
                <div className="flex justify-center flex-col">
                    <h1 className="font-bold text-3xl">Sales Tax Invoice</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm setValue={setValue} register={register} setRows={setInvoiceRows} />

                    {/* Table For Invoice */}
                    <div className="w-full flex flex-row mt-20">
                        <InvoiceTable
                            setValue={setValue}
                            setGenerateSummary={setGenerateSummary}
                            setRows={setInvoiceRows}
                            invoiceRows={invoiceRows}
                        />
                    </div>
                    {
                        isGenerateSummary &&
                        <div className="w-full flex flex-row mt-20">
                            <InvoiceSummary invoiceRows={invoiceRows} setValue={setValue} />
                        </div>
                    }
                    <div className="w-full flex justify-center gap-4 mt-10 flex-row">
                        <Button type="submit" disabled={(isLoading || !isGenerateSummary) ? true : false} className="flex flex-row gap-1 w-2/6">
                            Submit
                            <Loader isLoading={isLoading} />
                        </Button>
                        <Button variant={"secondary"} type="button">
                            Preview
                        </Button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}