'use client'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [estimate, setEstimate] = useState<any>(null);
    interface FormData {
        id: number;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            id: -1
        },
    });


    // This is to determine wether to user wants to find an estimate or create an estimate 
    const [isFind, setIsFind] = useState(false);
    const [isCreateEstimate, setIsCreateEstimate] = useState(false);

    const handleFindEstimate = () => {
        if (isCreateEstimate)
            setIsCreateEstimate(false);

        setIsFind(!isFind)
    }

    // After the user submits the form
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        // Setting Loading state of button
        setIsLoading(true);

        // Logic to get 
    }

    return (
        <>
            <Navbar />
            <div className="container h-full flex flex-row text-black justify-center gap-2">
                {/* When the user clicks on this button it will hide Create Estimate portion and show Find Estimate portion as well as hide show estimate portion */}
                <button onClick={() => handleFindEstimate()} type="button" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span className="relative z-10 text-black group-hover:text-white">Find Estimate</span>
                </button>

                {
                    !isFind &&
                    <button type="button" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Create Estimate</span>
                    </button>
                }
                {
                    isFind &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input onChange={(e) => {
                                e.preventDefault();
                                setValue('id', parseInt(e.target.value))
                            }} />
                        </div>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                }
            </div>
            <Footer />
        </>
    )
}