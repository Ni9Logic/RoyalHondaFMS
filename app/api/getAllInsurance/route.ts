import getAllInsurance from "@/app/actions/getAllInsurance";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const getAllInsurances = await getAllInsurance();

        if (!getAllInsurances)
            return NextResponse.json({ Message: 'Error Fetching Insurances' }, { status: 404 });

        return NextResponse.json({ Message: getAllInsurances }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}