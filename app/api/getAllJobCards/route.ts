import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function GET() {
    try {
        const allJobCards = await prisma.jobCard.findMany();
        
        if (!allJobCards)
            return NextResponse.json({ Error: "No Job Cards Created Yet!" }, { status: 404 })

        return NextResponse.json({ jobCards: allJobCards })
    }
    catch (error: any) {
        NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
    }
}