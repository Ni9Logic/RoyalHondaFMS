import getAllTransactions from "@/app/actions/getAllTransactions";
import { NextResponse } from "next/server";

export async function GET() {
    // There's nothing coming we just need to return all the transactions of the server
    try {
        const allTransactions = await getAllTransactions();
        if (!allTransactions)
            return NextResponse.json({ Error: 'There are no transactions made yet' }, { status: 400 });

        return NextResponse.json(allTransactions);

    } catch (error: any) {
        return NextResponse.json({ Error: 'Internal Error' }, { status: 500 });
    }
}