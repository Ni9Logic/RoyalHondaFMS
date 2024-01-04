import { PriceSheet } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { partNo } = await req.json();
        const partFound = await prisma.priceSheet.findFirst({
            where: {
                partNo: {
                    startsWith: partNo
                }
            },
        })
        if (!partFound) return NextResponse.json({ Message: 'Part Not Found' }, { status: 404 });

        return NextResponse.json({ Message: partFound }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 })
    }
}