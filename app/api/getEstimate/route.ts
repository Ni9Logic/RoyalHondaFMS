import getEstimate from "@/app/actions/getEstimate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id)
            return NextResponse.json({ Message: 'Id Not Provided' }, { status: 404 })

        const getFirstEstimate = await getEstimate(parseInt(id));
        if (!getFirstEstimate)
            return NextResponse.json({ Message: 'Estimate Not Found' }, { status: 404 })

        return NextResponse.json({ Message: getFirstEstimate });
    } catch (error: any) {
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 })
    }
}