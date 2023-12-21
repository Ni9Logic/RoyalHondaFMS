'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldArrayWithId, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateEstimate = () => {
    const [isLoading, setIsLoading] = useState(false);
    interface EstimateCreateForm {
        customerName: string;
        customerContact: string;
        requiredWorkDetails: { work: string, price: string }[]
    }
    interface EstimateRowType {
        work: string;
        price: string;
    }
    const [rows, setRows] = useState<EstimateRowType[]>([]);

    const {
        register,
        setValue,
        handleSubmit,
        control,
    } = useForm<EstimateCreateForm>({
        defaultValues: {
            customerName: '',
            customerContact: '',
            requiredWorkDetails: [{ work: '', price: '' }]
        }
    })

    const { fields } = useFieldArray({
        control,
        name: 'requiredWorkDetails',
    });
    const handleAddRow = () => {
        setRows(rows => [...rows, { work: storedRequiredWorkDetails[0].work, price: storedRequiredWorkDetails[0].price }]);
    };

    const totalCost = () => {
        let totalPrice: number = 0;
        rows.map((item, index) => {
            if (isNaN(Number(item.price))) return;

            totalPrice = totalPrice + parseInt(item?.price);
        })

        return totalPrice;
    }
    const handleRemoveRow = (indexToRemove: any) => {
        const updatedRows = rows.filter((_, index) => index !== indexToRemove);
        setRows(updatedRows);
    }
    // On each change uses useEffect
    const [storedRequiredWorkDetails, setStoredRequiredWorkDetails] = useState<FieldArrayWithId<EstimateCreateForm, 'requiredWorkDetails', 'id'>[]>([]);
    useEffect(() => {
        setStoredRequiredWorkDetails([...fields]);
    }, [fields])


    const onSubmit: SubmitHandler<EstimateCreateForm> = async (data: EstimateCreateForm) => {
        try {
            setIsLoading(true);

            axios.post('../../api/registerEstimate', data)
                .then(() => {
                    toast.success('Estimate Created Successfully');
                })
                .catch((error: any) => {
                    toast.error(error.messsage)
                })
                .finally(() => setIsLoading(false));
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 container w-[45vw ]">
                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                Customer Name
                            </th>
                            <td className="px-6 py-3 text-center">
                                <input {...register('customerName')} className="border-none outline-none text-center" placeholder="Customer Name" />
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                Customer Contact
                            </th>
                            <td className="px-6 py-6 text-center">
                                <input {...register('customerContact')} className="border-none outline-none text-center" placeholder="Customer Contact" />
                            </td>
                        </tr>
                    </tbody>
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
                        {rows.map((item, index) => (
                            <tr key={`rows-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <input
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const copy = [...rows];
                                            copy[index].work = value;
                                            setRows(copy);
                                            setValue('requiredWorkDetails', rows);
                                        }}
                                        placeholder="Work"
                                        className="border-none outline-none"
                                    />
                                </th>
                                <td className="px-6 py-4 text-center">
                                    <input
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const copy = [...rows];
                                            copy[index].price = value;
                                            totalCost();
                                            setRows(copy);
                                            setValue('requiredWorkDetails', rows);
                                        }}
                                        placeholder="Price"
                                        className="border-none outline-none text-center"
                                    />

                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveRow(index)}
                                        className="relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden print:hidden"
                                    >
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-red-500"></span>
                                        <span className="relative z-10 text-black group-hover:text-white">Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Estimated Cost
                            </th>
                            <td className="px-6 py-3 text-center">
                                {totalCost().toLocaleString() + ' Rs'}
                            </td>
                        </tr>
                    </tbody>

                </table>
                <div className="flex flex-row gap-2 w-[400px]">
                    <button
                        type="button"
                        onClick={() => handleAddRow()}
                        className="print:hidden relative mt-2 inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden"
                    >
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Add New Record</span>
                    </button>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden mt-2">
                        <span className="absolute inset-0 w-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full border-2 border-black bg-green-400"></span>
                        <span className="relative z-10 text-black">Save</span>
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateEstimate;