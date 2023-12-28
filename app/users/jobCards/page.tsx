'use client'
import { useRouter } from "next/navigation";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/ui/loader";

export default function PAGE() {
    const router = useRouter();
    const [isAllJobCardLoading, setisAllJobCardLoading] = useState(false);
    const [isCreateJobCardLoading, setisCreateJobCardLoading] = useState(false);
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center self-center h-[80vh]">
                <div className="gap-2 flex pt-5">
                    <Button disabled={isCreateJobCardLoading} onClick={() => {
                        setisCreateJobCardLoading(true);
                        router.push('/users/createJobCard');
                    }} className="flex gap-1">
                        Create Job Card
                        <Loader isLoading={isCreateJobCardLoading} />
                    </Button>
                    <Button disabled={isAllJobCardLoading} onClick={() => {
                        setisAllJobCardLoading(true);
                        router.push('/users/viewAllJobCards')
                    }} className="flex gap-1">
                        All Job Cards
                        <Loader isLoading={isAllJobCardLoading} />
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}