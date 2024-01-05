import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const lastEstimate = await prisma.estimatedCostWork.findFirst({
            orderBy: {
                id: 'desc',
            },
        });

        if (!lastEstimate) {
            return NextResponse.json({ error: 'No Estimate found' }, { status: 404 });
        }

        // Extract and return the seriapl number
        const { id } = lastEstimate;

        return NextResponse.json({ id: id }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 })
    }
}