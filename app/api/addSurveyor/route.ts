import { Surveyor } from "@/app/users/Estimate/newEstimate/page";
import { NextResponse } from "next/server";
import primsa from "@/app/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body: Surveyor = await req.json();

        const isCreated = await prisma?.surveyors.create({
            data: {
                cSurveyor: body.cSurveyor
            }
        })

        if (!isCreated)
            return NextResponse.json({ Message: "Error Adding Surveyor" }, { status: 500 });

        return NextResponse.json({ Message: isCreated }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}