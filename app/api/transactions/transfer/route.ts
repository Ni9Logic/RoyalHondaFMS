import {NextResponse} from "next/server";
import getUser from "../../../actions/getUser";
import prisma from "../../../lib/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {toUserEmail, fromUserEmail, amount} = body;

    try {
        if (!toUserEmail || !fromUserEmail || !amount) {
            return NextResponse.json({error: 'Missing Info from Parameters'}, {status: 400});
        }

        const toUser = await getUser(toUserEmail);
        if (!toUser)
            return NextResponse.json({error: 'User does not exist'}, {status: 400});

        const fromUser = await getUser(fromUserEmail);
        if (!fromUser)
            return NextResponse.json({error: 'Error in Session'}, {status: 400});

        // Withdraw fromUser
        const updateFromUser = await prisma.webUser.update({
            where: {
                email: fromUserEmail
            },
            data: {
                Balance: Number(fromUser?.Balance) - Number(amount)
            }
        });
        if (!updateFromUser)
            return NextResponse.json({error: 'Withdraw from user got error'}, {status: 404})

        // Deposit toUser
        const updateToUser = await prisma.webUser.update({
            where: {
                email: toUserEmail
            },
            data: {
                Balance: Number(toUser?.Balance) + Number(amount)
            }
        });
        if (!updateToUser)
            return NextResponse.json({error: 'Deposit to user got error'}, {status: 404});

        // Checking if transaction went successfully
        return NextResponse.json({updateToUser, updateFromUser});

    } catch (error: any) {
        return NextResponse.json({error: 'Internal Error'}, {status: 500});
    }
}

