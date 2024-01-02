'use client'
import getAllJobCards from "@/app/actions/getAllJobCards";
import { columns } from "@/app/components/ui/allUserTablesColumns";
import { DataTable } from "@/app/components/ui/data-table";
import { EstimateForm } from "@/app/users/Interfaces/Interface";

import { GetStaticProps } from "next";

interface ViewAllJobCardProps {
    jobCards: EstimateForm[] | null;
}

function ViewAllJobCards({ jobCards }: ViewAllJobCardProps) {
    return (
        <>
            {/* @ts-ignore */}
            <DataTable columns={columns} data={jobCards} />
        </>
    )
}

// @ts-ignore
export const getStaticProps: GetStaticProps<ViewAllJobCardProps> = async () => {
    const allJobCards = await getAllJobCards();
    return {
        props: {
            jobCards: allJobCards,
        },
        revalidate: 2,
    };
};

export default ViewAllJobCards;