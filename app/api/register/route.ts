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
        } = body;

        if (!fullname || !password || !email) {
            return new NextResponse('Missing Info', { status: 400 });
        }

        // Encrypting password
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.webUser.create({
            data: {
                fullname,
                hashedPassword,
                email,
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, "Error in registration");
        return new NextResponse('Internal Error', { status: 500 });
    }
}