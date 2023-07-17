'use client'

import {webUser} from "@prisma/client";
// @ts-ignore
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

interface transferProps {
    currentUser: webUser
}

interface FormValues {
    toUserEmail: string,
    amount: number
}

const transfer = async (toUserEmail: string, fromUserEmail: string, amount: number) => {
    try {
        const response = await fetch('/api/transactions/transfer', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                toUserEmail: toUserEmail,
                fromUserEmail: fromUserEmail,
                amount: amount,
            }),
        })

        if (response.ok) {
            return await response.json();
        }
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

const Transfers: React.FC<transferProps> = ({currentUser}) => {
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit} = useForm<FormValues>();
    const router = useRouter();
    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        setLoading(true);
        try {

            if (currentUser?.email === data.toUserEmail) {
                setLoading(false);
                toast.error('You have entered invalid email');
                return null;
            }

            if (!currentUser?.Balance || !currentUser || !currentUser?.email || !data.amount) {
                setLoading(false);
                toast.error('Missing fields');
                return null;
            }

            if (data.amount <= 0 || isNaN(data.amount)) {
                setLoading(false);
                toast.error('Invalid Amount');
                return null;
            }

            if (data.amount > currentUser?.Balance) {
                setLoading(false);
                toast.error('Insufficient Balance');
                return null;
            }

            const isTransfer = await transfer(data.toUserEmail as string, currentUser?.email as string, data.amount);

            if (isTransfer) {
                toast.success('Transfer Balance Successfully')
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
                setLoading(false);
            } else
                throw new Error('User email does not exist');


        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }

    }

    if (!currentUser)
        return null;

    return (
        <>
            <div className='flex flex-col border border-gray justify-center items-center h-[75vh] gap-10'>
                {/* Showing Available balance */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-auto border border-gray-700">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Available Balance
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.Balance}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* Need to add an input field */}
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="input-group-1"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Enter email of the user
                        </label>
                        <input type="email" id="input-group-1" {...register('toUserEmail')}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="name@email.com"/>
                        <label htmlFor="input-group-1"
                               className="block mb-2 my-6 text-sm font-medium text-gray-900 dark:text-white">
                            Enter Amount To Transfer
                        </label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-6.5 pointer-events-none">
                                <svg className='w-10 h-10' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     width="100" height="100" viewBox="0 0 100 100">
                                    <path fill="#a1d3a2"
                                          d="M80.81,71.941L18.097,56.172c-2.317-0.583-3.736-2.955-3.153-5.272L22.663,20.2c0.583-2.317,2.955-3.736,5.272-3.153l62.713,15.769c2.317,0.583,3.736,2.955,3.153,5.272l-7.719,30.701C85.499,71.105,83.127,72.524,80.81,71.941z"></path>
                                    <path fill="#1f212b"
                                          d="M81.869,73.073c-0.435,0-0.872-0.054-1.304-0.162l0,0l-62.713-15.77c-1.379-0.347-2.544-1.214-3.278-2.441s-0.948-2.664-0.601-4.044l7.719-30.701c0.719-2.855,3.631-4.596,6.485-3.879l62.714,15.769c2.857,0.719,4.598,3.629,3.879,6.486l-7.72,30.7c-0.347,1.379-1.214,2.544-2.441,3.278C83.766,72.815,82.824,73.073,81.869,73.073z M81.054,70.972c0.862,0.218,1.76,0.082,2.528-0.378c0.77-0.461,1.312-1.188,1.529-2.05l7.72-30.701c0.217-0.861,0.083-1.76-0.378-2.529c-0.46-0.77-1.188-1.312-2.05-1.529L27.691,18.016c-1.782-0.447-3.607,0.639-4.059,2.428l-7.719,30.701c-0.217,0.861-0.083,1.76,0.378,2.529c0.46,0.769,1.188,1.312,2.049,1.528L81.054,70.972z"></path>
                                    <path fill="#60be92"
                                          d="M70.732,33.953l-39.452-9.92c-0.616,2.445-2.958,3.964-5.233,3.392l-4.704,18.708c2.276,0.572,3.622,3.02,3.007,5.466l53.115,13.355c0.615-2.447,2.959-3.966,5.235-3.394l4.704-18.708c0,0-0.001,0-0.001,0c-2.276-0.572-3.622-3.018-3.008-5.465l-4.771-1.2"></path>
                                    <path fill="#1f212b"
                                          d="M77.464,65.454c-0.04,0-0.081-0.005-0.122-0.015L24.227,52.084c-0.129-0.033-0.239-0.115-0.307-0.229c-0.068-0.114-0.089-0.25-0.057-0.379c0.268-1.061,0.135-2.151-0.372-3.072c-0.5-0.91-1.307-1.544-2.271-1.786c-0.129-0.033-0.239-0.115-0.307-0.229c-0.068-0.114-0.089-0.25-0.057-0.379l4.704-18.708c0.067-0.268,0.337-0.428,0.607-0.363c1.998,0.507,4.078-0.855,4.627-3.029c0.066-0.267,0.337-0.429,0.606-0.363l39.452,9.92c0.268,0.067,0.43,0.34,0.363,0.607c-0.068,0.267-0.339,0.428-0.607,0.363L31.62,24.634c-0.796,2.258-2.99,3.666-5.204,3.371l-4.474,17.792c1.023,0.381,1.874,1.122,2.425,2.125c0.551,1.001,0.746,2.159,0.566,3.309l52.189,13.122c0.385-1.098,1.105-2.025,2.063-2.646c0.962-0.624,2.062-0.871,3.142-0.726l4.475-17.792c-2.103-0.786-3.36-3.066-2.992-5.433l-4.309-1.082c-0.268-0.067-0.43-0.34-0.363-0.607c0.068-0.268,0.334-0.429,0.607-0.363l4.771,1.199c0.268,0.067,0.43,0.339,0.363,0.607c-0.547,2.175,0.64,4.354,2.645,4.857c0.129,0.033,0.239,0.115,0.307,0.229c0.068,0.114,0.089,0.25,0.057,0.379l-4.704,18.708c-0.033,0.129-0.115,0.239-0.229,0.307c-0.114,0.067-0.252,0.087-0.379,0.057c-0.962-0.244-1.975-0.065-2.846,0.499c-0.882,0.572-1.515,1.471-1.781,2.531C77.892,65.303,77.689,65.454,77.464,65.454z"></path>
                                    <path fill="#a1d3a2" d="M73.399 34.623L72.51 34.4"></path>
                                    <path fill="#1f212b"
                                          d="M73.4,35.123c-0.04,0-0.081-0.005-0.122-0.015l-0.89-0.224c-0.268-0.067-0.43-0.34-0.363-0.607c0.067-0.267,0.335-0.428,0.607-0.363l0.89,0.224c0.268,0.067,0.43,0.34,0.363,0.607C73.828,34.972,73.624,35.123,73.4,35.123z"></path>
                                    <path fill="#a1d3a2"
                                          d="M53.921 36.384A8.498 8.498 0 1 0 53.921 53.379999999999995A8.498 8.498 0 1 0 53.921 36.384Z"
                                          transform="rotate(-75.883 53.924 44.882)"></path>
                                    <path fill="#1f212b"
                                          d="M53.92,53.881c-0.724,0-1.46-0.089-2.193-0.272c-4.812-1.21-7.741-6.109-6.532-10.921c1.21-4.811,6.109-7.737,10.921-6.532c2.331,0.586,4.294,2.045,5.527,4.107c1.234,2.062,1.591,4.482,1.005,6.813C61.622,51.154,57.947,53.881,53.92,53.881z M53.922,36.883c-3.579,0-6.846,2.424-7.757,6.049c-1.076,4.276,1.528,8.631,5.806,9.706c4.275,1.078,8.631-1.528,9.706-5.806c0.521-2.072,0.204-4.223-0.893-6.056c-1.096-1.834-2.841-3.13-4.913-3.65C55.22,36.962,54.566,36.883,53.922,36.883z"></path>
                                    <g>
                                        <path fill="#a1d3a2"
                                              d="M38.421 37.382999999999996A2.999 2.999 0 1 0 38.421 43.381A2.999 2.999 0 1 0 38.421 37.382999999999996Z"
                                              transform="rotate(-75.883 38.424 40.382)"></path>
                                        <path fill="#1f212b"
                                              d="M38.421,43.881c-0.281,0-0.568-0.034-0.854-0.105c-0.906-0.228-1.67-0.795-2.149-1.598c-0.479-0.802-0.618-1.743-0.391-2.649c0.47-1.871,2.371-3.012,4.247-2.541c1.871,0.472,3.011,2.377,2.541,4.248l0,0C41.416,42.821,39.987,43.881,38.421,43.881z M38.422,37.882c-1.119,0-2.14,0.758-2.424,1.891c-0.163,0.647-0.064,1.319,0.278,1.893c0.343,0.572,0.888,0.978,1.535,1.14c0.646,0.164,1.319,0.065,1.893-0.278c0.573-0.343,0.979-0.888,1.141-1.535c0.336-1.337-0.479-2.697-1.814-3.033C38.828,37.906,38.623,37.882,38.422,37.882z M41.33,41.113h0.01H41.33z"></path>
                                    </g>
                                    <g>
                                        <path fill="#a1d3a2"
                                              d="M70.421 45.382999999999996A2.999 2.999 0 1 0 70.421 51.381A2.999 2.999 0 1 0 70.421 45.382999999999996Z"
                                              transform="rotate(-75.889 70.419 48.383)"></path>
                                        <path fill="#1f212b"
                                              d="M70.421,51.881c-0.281,0-0.568-0.034-0.854-0.105c-1.871-0.472-3.011-2.376-2.54-4.247c0.47-1.871,2.372-3.012,4.247-2.541c1.871,0.472,3.011,2.377,2.541,4.248l0,0C73.416,50.821,71.987,51.881,70.421,51.881z M70.422,45.882c-1.119,0-2.14,0.758-2.424,1.891c-0.337,1.336,0.477,2.696,1.813,3.032c0.647,0.165,1.32,0.064,1.893-0.278c0.573-0.343,0.979-0.888,1.141-1.535c0.336-1.337-0.479-2.697-1.814-3.033C70.828,45.906,70.623,45.882,70.422,45.882z M73.33,49.113h0.01H73.33z"></path>
                                    </g>
                                    <g>
                                        <path fill="#fef6aa"
                                              d="M20.921 41.882A13 13 0 1 0 20.921 67.882A13 13 0 1 0 20.921 41.882Z"></path>
                                        <path fill="#1f212b"
                                              d="M20.921,68.882c-7.72,0-14-6.28-14-14s6.28-14,14-14s14,6.28,14,14S28.641,68.882,20.921,68.882z M20.921,42.882c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S27.538,42.882,20.921,42.882z"></path>
                                    </g>
                                    <g>
                                        <path fill="#f9e65c"
                                              d="M20.921 46.382A8.5 8.5 0 1 0 20.921 63.382A8.5 8.5 0 1 0 20.921 46.382Z"></path>
                                        <path fill="#1f212b"
                                              d="M20.921,63.882c-4.963,0-9-4.037-9-9s4.037-9,9-9s9,4.037,9,9S25.884,63.882,20.921,63.882z M20.921,46.882c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S25.332,46.882,20.921,46.882z"></path>
                                    </g>
                                    <g>
                                        <path fill="#fef6aa"
                                              d="M43.921 59.882000000000005A13 13 0 1 0 43.921 85.882A13 13 0 1 0 43.921 59.882000000000005Z"></path>
                                        <path fill="#1f212b"
                                              d="M43.921,86.882c-7.72,0-14-6.28-14-14s6.28-14,14-14s14,6.28,14,14S51.641,86.882,43.921,86.882z M43.921,60.882c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S50.538,60.882,43.921,60.882z"></path>
                                    </g>
                                    <g>
                                        <path fill="#f9e65c"
                                              d="M43.921 64.382A8.5 8.5 0 1 0 43.921 81.382A8.5 8.5 0 1 0 43.921 64.382Z"></path>
                                        <path fill="#1f212b"
                                              d="M43.921,81.882c-4.963,0-9-4.037-9-9s4.037-9,9-9s9,4.037,9,9S48.884,81.882,43.921,81.882z M43.921,64.882c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S48.332,64.882,43.921,64.882z"></path>
                                    </g>
                                </svg>
                            </div>
                            <input type="text" id="input-group-1" {...register('amount')}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Amount > 0"/>
                        </div>
                        {/* Buttons */}
                        <div className='flex flex-row gap-10 mb-10'>
                            <button
                                className={`w-[300px] bg-gray-200 border-0 ${isLoading ? 'cursor-not-allowed opacity-25' : ''} py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0`}
                                type="submit"
                                disabled={isLoading}>
                                Transfer Amount
                            </button>
                        </div>
                    </form>
                    <button
                        className=" w-[300px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                        onClick={() => router.push('/users')}>
                        Back
                    </button>


                </div>
            </div>
        </>
    );


}

export default Transfers;