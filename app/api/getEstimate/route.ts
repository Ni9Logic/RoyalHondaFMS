import getEstimate from "@/app/actions/getEstimate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id)
            return NextResponse.json({ Error: 'Id Not Provided' }, { status: 404 })

        const getFirstEstimate = await getEstimate(id);
        if (!getFirstEstimate)
            return NextResponse.json({ Error: 'Estimate Not Found' }, { status: 404 })

        return NextResponse.json({ getFirstEstimate });
    } catch (error: any) {
        return NextResponse.json({ error: error.cause }, { status: 400 })
    }
}