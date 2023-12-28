import {NextResponse} from "next/server";
import getUser from "@/app/actions/getUser";
import getCurrentUser from "@/app/actions/getCurrentUser";



export async function POST(request: Request) {
    const body = await request.json();
    const {email} = body;
    try {
        const curUser = await getCurrentUser();
        if (curUser?.email === email)
            return NextResponse.json({Error: 'You cannot enter your email'}, {status: 404})

        if (!email)
            return NextResponse.json({Error: 'Email not provided'}, {status: 404});

        const getUserFirst = await getUser(email);
        if (!getUserFirst)
            return NextResponse.json({Error: 'Invalid Email Address'}, {status: 404})

        return NextResponse.json(getUserFirst);


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({Error: error.cause}, {status: 500})
    }
}