import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, customerName, customerContact, requiredWorkDetails } = body;


        const updatedEstimate = await prisma?.estimatedCostWork.update({
            where: {
                id: id
            },
            data: {
                cName: customerName,
                cContact: customerContact,
                requiredWorkDetails: JSON.stringify(requiredWorkDetails),
            }
        })

        if (!updatedEstimate)
            throw new Error('Some Error Occurred');

        return NextResponse.json(updatedEstimate);

    } catch (error: any) {
        return NextResponse.json({ Error: error.message }, { status: 500 });
    }
}