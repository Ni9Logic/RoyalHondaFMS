"use client"
//@ts-ignore
import React from "react";

import {UsersTable} from "@/app/components/ui/UsersTable/data-table";
import {columns} from "@/app/components/ui/UsersTable/columns";
import {useRouter} from "next/navigation";
import {webUser} from "@prisma/client";

interface viewAllUserProps{
    user: webUser;
}

const ViewAllUsers: React.FC<viewAllUserProps> = async ({user}) => {
    const router = useRouter();
    if (!user)
        return null;

    return (
        <>
            <div className="flex container mx-auto w-full">
                {/* @ts-ignore */}
                <UsersTable columns={columns} data={user}/>
            </div>
            <button
                className="flex flex-col container text-center items-center w-[300px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                onClick={() => router.push('/users')}>
                Back
            </button>
        </>
    );
}

export default ViewAllUsers;