'use client'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";

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
    const [search, setSearch] = useState(false);

    const handleFindEstimate = () => {
        if (isCreateEstimate)
            setIsCreateEstimate(false);

        setIsFind(!isFind)
    }

    // After the user submits the find estimate Form
    const onFindSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        // Setting Loading state of button
        setIsLoading(true);
        const response = await axios.post('../../api/getEstimate', { id: data.id })
            .catch((error: any) => {
                toast.error(error?.response?.data?.Error)
            });

        if (response) {
            toast.success('Estimate Found')

            const newEstimate = JSON.parse(response?.data?.getFirstEstimate?.requiredWorkDetails)
            setEstimate(newEstimate);
            console.log(newEstimate)
        }
    }

    return (
        <>
            <Navbar />
            <div className="container h-[80vh] flex flex-col text-black justify-center gap-2">
                <div className="flex flex-row items-center justify-center self-center gap-2">
                    {/* When the user clicks on this button it will hide Create Estimate portion and show Find Estimate portion as well as hide show estimate portion */}
                    <button onClick={() => handleFindEstimate()} type="button" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                        <span className="absolute inset-0 w-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full bg-white border-2 border-black group-hover:bg-black"></span>
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
                        <form onSubmit={handleSubmit(onFindSubmit)}>

                            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setValue('id', parseInt(e.target.value));
                                    }} type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                    }
                </div>
                {
                    estimate && estimate.length > 0 && isFind &&
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 container w-full">
                        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Work
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Price
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {estimate?.map((item: any, index: number) => (
                                <tr key={`rows-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {item?.work}
                                    </th>
                                    <td className="px-6 py-4">
                                        {parseInt(item.price).toLocaleString()} Rs
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                }
            </div>
            <Footer />
        </>
    )
}