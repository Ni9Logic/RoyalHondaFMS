import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        return NextResponse.json(request.body);
    } catch (error: any) {
        NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
    }
}