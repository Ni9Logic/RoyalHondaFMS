import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: id
            }
        });

        if (!invoice) {
            return NextResponse.json({ Message: "Invoice not found" }, { status: 404 });
        }

        return NextResponse.json({ Message: invoice }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}