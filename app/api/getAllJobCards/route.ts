import { NextResponse } from "next/server";
import getAllJobCards from "@/app/actions/getAllJobCards";

export async function POST() {
    try {
        const allJobCards = await getAllJobCards();
        if (!allJobCards || allJobCards.length === 0) {
            return NextResponse.json({ Error: "No Job Cards Created Yet!" }, { status: 404 });
        }

        return NextResponse.json({ jobCards: allJobCards })
    }
    catch (error: any) {
        NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
    }
}