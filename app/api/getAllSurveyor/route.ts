import getAllSurveyor from "@/app/actions/getAllSurveyor";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const surveyors = await getAllSurveyor();

        if (!surveyors)
            return NextResponse.json({ Message: "Error Getting Surveyors" }, { status: 500 });

        return NextResponse.json({ Surveyors: surveyors }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}