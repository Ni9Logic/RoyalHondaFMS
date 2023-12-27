import getAllEstimates from "@/app/actions/getAllEstimate";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allEstimates = await getAllEstimates();
    
        if (!allEstimates)
            return NextResponse.json({ Message: 'Some Error Occurred' }, { status: 500 });

        return NextResponse.json({ Estimates: allEstimates }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}