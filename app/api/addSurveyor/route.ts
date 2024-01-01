import { Surveyor } from "@/app/users/Estimate/newEstimate/page";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body: Surveyor = await req.json();

        const isFind = await prisma.surveyors.findUnique({
            where: {
                cSurveyor: body.cSurveyor
            }
        })

        if (isFind)
            return NextResponse.json({ Message: "Surveyor Already Exists" }, { status: 400 });
        
        const isCreated = await prisma.surveyors.create({
            data: {
                cSurveyor: body.cSurveyor,
                cSurveyorNTN: body.cSurveyorNTN,
            }
        })

        if (!isCreated)
            return NextResponse.json({ Message: "Error Adding Surveyor" }, { status: 500 });

        return NextResponse.json({ Message: isCreated }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}