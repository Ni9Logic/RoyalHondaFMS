import {NextResponse} from "next/server";
import prisma from "../../lib//prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {amount, email, transactionType} = body;

    let data;
    try {
        switch (transactionType) {
            case "Withdraw":
                data = {
                    Amount: Number(amount),
                    AccountHolder_email: email,
                    Transaction_Type: transactionType,
                }
                break;
            case "Deposit":
                data = {
                    Amount: Number(amount),
                    AccountHolder_email: email,
                    Transaction_Type: transactionType,
                }
                break;
            default:
                return NextResponse.json({error: 'Invalid Transaction Type'}, {status: 400})


        }
        const transaction = await prisma.webTransactions.create({
            data: data
        });

        return NextResponse.json(transaction); // Assuming a successful operation, return the created transaction

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({error: error.message}, {status: 500});
    }
}