'use client'
import getAllJobCards from "@/app/actions/getAllJobCards";
import { columns } from "@/app/components/ui/allUserTablesColumns";
import { DataTable } from "@/app/components/ui/data-table";
import { EstimateForm } from "@/app/users/Interfaces/Interface";
import { JOBFormData } from "@/app/users/createJobCard/page";

import { GetServerSideProps, GetStaticProps } from "next";
import { useEffect, useState } from "react";

interface ViewAllJobCardProps {
    jobCards: EstimateForm[];
}

function ViewAllJobCards() {
    const [jobCards, setJobCards] = useState<JOBFormData[]>([]);
    useEffect(() => {
        (async function (){

            const allJobCards = await getAllJobCards();
            console.log('allJobCards:', allJobCards);
            // @ts-ignore
            setJobCards(allJobCards);
        });
    }, []);
    return (
        <>
            {/* @ts-ignore */}
            <DataTable columns={columns} data={jobCards} />
        </>
    )
}



export default ViewAllJobCards;