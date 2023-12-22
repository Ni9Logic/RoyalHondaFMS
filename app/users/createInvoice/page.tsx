'use client'
import { useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useForm } from "react-hook-form";

export default function Page() {
    // Invoice Creation Interface
    interface invoiceCreateForm {
        customerName: string;
        customerContact: string;
        NTN: string;
        carName: string;
        carColor: string;
        carRegistration: string;
        Mileage: string;
        dateTime: string;
        descriptionPrice: { work: string, price: string }[];
    }

    // Rows types
    interface descriptionPriceRowType {
        work: string;
        price: string;
    }

    const {
        register,
        setValue,
        handleSubmit,
    } = useForm<invoiceCreateForm>({
        defaultValues: {
            customerName: '',
            customerContact: '',
            carName: '',
            carColor: '',
            carRegistration: '',
            dateTime: '',
            Mileage: '',
            NTN: '',
            descriptionPrice: [{ work: '', price: '' }]
        }
    })

    // Will be used later to store values inside this
    const [rows, setRows] = useState<descriptionPriceRowType[]>([]);
    return (
        <>
            <Navbar />
            <div className="h-[79vh] flex flex-col items-center justify-center">
                <form>
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 container w-[45vw]">
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
                                    Email Us
                                </th>
                                <td className="px-6 py-3 text-center">
                                    services.royalhonda@gmail.com
                                </td>
                            </tr>
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    Registration Number
                                </th>
                                <td className="px-6 py-6 text-center">
                                    <input {...register('carRegistration')} className="border-none outline-none text-center" placeholder="Registration Number" />
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    Mileage
                                </th>
                                <td className="px-6 py-6 text-center">
                                    <input {...register('Mileage')} className="border-none outline-none text-center" placeholder="Mileage" />
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    Car Name
                                </th>
                                <td className="px-6 py-6 text-center">
                                    <input {...register('carName')} className="border-none outline-none text-center" placeholder="Car Name" />
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    Car Color
                                </th>
                                <td className="px-6 py-6 text-center">
                                    <input {...register('carColor')} className="border-none outline-none text-center" placeholder="Car Color" />
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    NTN
                                </th>
                                <td className="px-6 py-6 text-center">
                                    <input {...register('NTN')} className="border-none outline-none text-center" placeholder="Car Color" />
                                </td>
                            </tr>
                        </tbody>
                        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                            <th scope="col" className="px-6 py-3 text-center">Item Description</th>
                            <th scope="col" className="px-6 py-3 text-center">Item Price</th>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    Item Description
                                </th>
                                <td className="px-6 py-3 text-center">
                                    Item Price
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    Total Estimate Cost
                                </th>
                                <td className="px-6 py-3 text-center">
                                    {/* Logic for total Estimate Cost */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <Footer />
        </>
    )
}