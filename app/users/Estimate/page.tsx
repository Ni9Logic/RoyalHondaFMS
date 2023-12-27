'use client'
import { useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/ui/loader";
import { useRouter } from "next/navigation";

export default function PAGE() {
    const router = useRouter();
    const [isCreateEstimateLoading, setCreateEstimateLoading] = useState(false);
    const [isViewAllEstimatesLoading, setisViewAllEstimatesLoading] = useState(false);
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center self-center h-[80vh]">
                <div className="gap-2 flex pt-5">
                    <Button disabled={isCreateEstimateLoading} className="flex gap-1" onClick={() => {
                        setCreateEstimateLoading(true);
                        router.push('/users/Estimate/newEstimate');
                    }}>
                        Create Estimate
                        <Loader isLoading={isCreateEstimateLoading} />
                    </Button>
                    <Button disabled={isViewAllEstimatesLoading} className="flex gap-1" onClick={() => {
                        setisViewAllEstimatesLoading(true);
                        router.push('/users/Estimate/viewAllEstimates');
                    }}>
                        View All Estimates
                        <Loader isLoading={isViewAllEstimatesLoading} />
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}