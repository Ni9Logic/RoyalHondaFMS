import { JOBFormData } from "@/app/users/jobCards/editJob/page";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body: JOBFormData = await request.json();
        console.log(body);
        return NextResponse.json(request.body);
    } catch (error: any) {
        NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
    }
}