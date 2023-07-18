"use client"

import {webTransactions} from "@prisma/client";
import React from "react";
import {DataTable} from "@/app/components/ui/DataTable/data-table";
import {columns} from "@/app/components/ui/DataTable/columns";
import {useRouter} from "next/navigation";


interface transactionProps {
    transactions: webTransactions
}

const Transactions: React.FC<transactionProps> = async ({transactions}) => {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col container items-center justify-center  min-h-[72vh]">
                {/* @ts-ignore */}
                <DataTable columns={columns} data={transactions}/>
            </div>

            <button
                className="flex flex-col container text-center items-center w-[300px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                onClick={() => router.push('/users')}>
                Back
            </button>
        </>
    );
}

export default Transactions;