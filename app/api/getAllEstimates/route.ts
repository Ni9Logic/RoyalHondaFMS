import getAllEstimates from "@/app/actions/getAllEstimate";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST() {
    try {
        const allEstimates = await prisma.estimatedCostWork.findMany({
            orderBy: {
                id: 'desc',
            }
        });
        if (!allEstimates)
            return NextResponse.json({ Message: 'Some Error Occurred' }, { status: 500 });

        return NextResponse.json({ Estimates: allEstimates }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}