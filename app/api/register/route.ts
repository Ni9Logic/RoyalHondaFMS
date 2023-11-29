import bcrypt from "bcrypt";

import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            fullname,
            password,
            email,
            semester,
        } = body;

        if (!fullname || !password || !email || !semester) {
            return new NextResponse('Missing Info', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.webUser.create({
            data: {
                fullname,
                hashedPassword,
                email,
                semester,
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, "Error in registration");
        return new NextResponse('Internal Error', { status: 500 });
    }
}