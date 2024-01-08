import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST() {
    try {
        const isFind = await prisma.summarySheet.findMany({
            orderBy: {
                id: 'desc',
            }
        })
        if (!isFind) return NextResponse.json({ Message: 'No Estimate Found' }, { status: 404 });

        return NextResponse.json({ Sheets: isFind }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}