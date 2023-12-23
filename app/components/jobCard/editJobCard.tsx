'use client'
import Footer from "@/app/users/Footer";
import Navbar from "@/app/users/Navbar";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface EditJobCardsProps {
    data: any,
    onClose: () => void;
}



const EditJobCard: React.FC<EditJobCardsProps> = ({ data, onClose }: EditJobCardsProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose(); // Call the onClose function when "Escape" is pressed
            }
        };

        // Add event listener when the component mounts
        document.addEventListener("keydown", handleKeyDown);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]); // Re-run effect when onClose changes

    const {
        register,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            CustomerName: data?.CustomerName,
            DriverUser: data?.DriverUser,
            WorkType: data?.WorkType,
            Insurance: data?.Insurance,
            CellNo: data?.CellNo,
            RequiredWorkDetails: data?.RequiredWorkDetails,
            OtherAdditionalDetails: data?.OtherAdditionalDetails,
        }
    })
    return (
        <div className="h-[75vh] flex items-center w-full">
            <form>
                <section className="bg-white dark:bg-gray-900 w-full flex">
                    <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16 w-full">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Job Card</h2>
                        <form action="#" className="w-full">
                            <div className="grid grid-cols-4 grid-rows-4 gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 w-full">
                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serial No</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={`${data?.SerialNo}`} disabled />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Name</label>
                                    <input type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={data?.CustomerName || ''} {...register('CustomerName')} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driver | User</label>
                                    <input type="text" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={data?.DriverUser} {...register('DriverUser')} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driver | User</label>
                                    <input type="text" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={data?.DriverUser} {...register('DriverUser')} />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Type</label>
                                    <select {...register('WorkType')} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option disabled selected>{data?.WorkType}</option>
                                        <option value="INSURANCE">Insurance</option>
                                        <option value="WORK ORDER">Work Order</option>
                                        <option value="CASH WORK">Cash Work</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insurance</label>
                                    <select {...register('Insurance')} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option disabled selected>{data?.Insurance}</option>
                                        <option value="HABIB BANK LIMITED">HABIB BANK LIMITED</option>
                                        <option value="TPL Insurance Coampnay">TPL INSURANCE COMPANY</option>
                                        <option value="IGI GENERAL INSURNACE LIMITED">IGI GENERAL INSURNACE LIMITED </option>
                                        <option value="SALAAM TAKAFUL INS PAKISTAN LTD">SALAAM TAKAFUL INS PAKISTAN LTD</option>
                                        <option value="ALFALAH GENERAL INSURNACE COMPANY LTD">ALFALAH GENERAL INSURNACE COMPANY LTD</option>
                                        <option value="JUBILEE INSURNACE COMPANY">JUBILEE INSURNACE COMPANY</option>
                                        <option value="ATLAS INSURNACE COMPANY LTD">ATLAS INSURNACE COMPANY LTD</option>
                                        <option value="ADAMJEE INSURNACE CORP BR KHI">ADAMJEE INSURNACE CORP BR KHI</option>
                                        <option value="ASKARI GENERAL INSURNACE COMPANY LTD">ASKARI GENERAL INSURNACE COMPANY LTD</option>
                                        <option value="EFU GENERAL INSURNACE COMPANY LTD">EFU GENERAL INSURNACE COMPANY LTD</option>
                                        <option value="UBL INSURNACE COMPANY">UBL INSURNACE COMPANY</option>
                                        <option value="EFU GENERAL INSURNACE COMPANY LTD">EFU GENERAL INSURNACE COMPANY LTD</option>
                                        <option value="PAK QATAR">PAK QATAR</option>
                                        <option value="UNITED INS">UNITED INS</option>
                                        <option value="NONE">NONE</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</label>
                                    <input type="text" {...register('CellNo')} id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={data?.CellNo} />
                                </div>
                                <div className="flex flex-row w-[10000px ] gap-2">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Required Work Details</label>
                                        <textarea id="description" rows={8} {...register('RequiredWorkDetails')} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={data?.RequiredWorkDetails}></textarea>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other Work Details</label>
                                        <textarea id="description" rows={8} {...register('OtherAdditionalDetails')} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={data?.OtherAdditionalDetails}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button type="submit" className="text-white bg-blue-500 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Update product
                                </button>
                                <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default EditJobCard;