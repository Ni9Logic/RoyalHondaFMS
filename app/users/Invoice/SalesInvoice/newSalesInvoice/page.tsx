'use client'
import Footer from "@/app/users/Footer";
import Navbar from "@/app/users/Navbar";
import InputForm from "../Components/InputForm";
import { InvoiceData } from "@/app/lib/Resources";
import { SubmitHandler, useForm } from "react-hook-form";
import { Invoice } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/ui/loader";

export default function PAGE() {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<Invoice>({
        defaultValues: InvoiceData,
    })

    const onSubmit: SubmitHandler<Invoice> = (Data: Invoice) => {
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center flex-col items-center">
                <div className="flex justify-center flex-col">
                    <h1 className="font-bold text-3xl">Sales Tax Invoice</h1>
                </div>
                <form id="searchEstimateForm"></form>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm setValue={setValue} register={register} />
                    <div className="w-full flex justify-center gap-4 mt-10 flex-row">
                        <Button type="submit" disabled={isLoading} className="flex flex-row gap-1 w-2/6">
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