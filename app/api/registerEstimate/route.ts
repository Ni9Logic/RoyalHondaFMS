import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, cellNo, requiredWorkDetails } = body;

        if (!customerName || !cellNo || !requiredWorkDetails)
            return NextResponse.json({ error: 'Missing Details' }, { status: 400 })

        // Create EstimatedCostWork record
        const estimatedWorkResult = await prisma.estimatedCostWork.create({
            data: {
                requiredWorkDetails: JSON.stringify(requiredWorkDetails),
            },
        });

        if (!estimatedWorkResult)
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })

        return NextResponse.json(estimatedWorkResult);
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}