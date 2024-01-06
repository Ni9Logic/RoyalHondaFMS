import getAllInvoices from "@/app/actions/getAllInvoices";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const allInvoices = await getAllInvoices();
        if (!allInvoices)
            return NextResponse.json({ Message: "No Invoices Found" }, { status: 404 });

        return NextResponse.json({ Message: allInvoices }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}