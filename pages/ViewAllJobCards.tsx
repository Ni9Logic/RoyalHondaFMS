import getAllJobCards from "@/app/actions/getAllJobCards";
import { columns } from "@/app/components/ui/allUserTablesColumns";
import { DataTable } from "@/app/components/ui/data-table";
import { EstimateForm } from "@/app/users/Interfaces/Interface";

import { GetStaticProps } from "next";

interface ViewAllJobCardProps {
    jobCards?: EstimateForm[] | null;
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
    try {
        const allJobCards = await getAllJobCards();

        // Ensure 'allJobCards' is not undefined or empty before returning
        if (!allJobCards) {
            throw new Error("No job cards found");
        }

        return {
            props: {
                jobCards: allJobCards,
            },
            revalidate: 2,
        };
    } catch (error: any) {
        console.error("Error fetching job cards:", error.message);

        return {
            props: {
                jobCards: null,
            },
            revalidate: 2,
        };
    }
};


export default ViewAllJobCards;