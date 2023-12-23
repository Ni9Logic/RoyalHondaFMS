import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const lastJobCard = await prisma.jobCard.findFirst({
            orderBy: {
                SerialNo: 'desc',
            },
        });

        if (!lastJobCard) {
            return NextResponse.json({ error: 'No JobCard found' }, { status: 404 });
        }

        // Extract and return the serial number
        const { SerialNo } = lastJobCard;
        console.log(SerialNo)

        return NextResponse.json({ serialNumber: SerialNo });
    } catch (error: any) {
        return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 })
    }
}