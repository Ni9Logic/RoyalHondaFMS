"use client"
import { webTransactions } from "@prisma/client";
import { useRouter } from "next/navigation";
import { TransactionTable } from "@/app/components/ui/TransactionTable/data-table";
import { columns } from "@/app/components/ui/TransactionTable/columns";

interface viewTransactionProps {
    transactions: webTransactions[];
}

const ViewTransactions: React.FC<viewTransactionProps> = async ({ transactions }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col container items-center justify-center  min-h-[72vh]">
                {/* @ts-ignore */}
                <TransactionTable columns={columns} data={transactions} />
            </div>

            <button
                className="flex flex-col container text-center items-center w-[300px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                onClick={() => router.push('/users')}>
                Back
            </button>
        </>
    );
};

export default ViewTransactions;