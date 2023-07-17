import {NextResponse} from "next/server";
import prisma from "../../lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const {field_to_update, new_value, email} = body;

    try {
        if (!field_to_update || !new_value || !email)
            return NextResponse.json({message: 'Missing Value'}, {status: 404});


        let data;
        switch (field_to_update) {
            case "email":
                // Check if the email is linked with a user or not
                const user = await prisma.webUser.findUnique({
                    where: {email: new_value}
                })

                if (user)
                    return NextResponse.json({message: 'Username already linked with another account'}, {status: 400});

                data = {email: new_value};
                break;
            case "fullname":
                if (new_value.length < 4)
                    return NextResponse.json({message: 'Name must contain at least 4 characters'}, {status: 400})

                data = {fullname: new_value};
                break;
            case "hashedPassword":
                if (new_value.length < 8)
                    return NextResponse.json({message: 'Password must be greater than 8 characters'}, {status: 400})
                const newPassword = await bcrypt.hash(new_value, 12);
                data = {hashedPassword: newPassword};
                break;
            case "phone":
                data = {phone: new_value};
                break;
            case "accountType":
                if (new_value.toLowerCase() !== "current" && new_value.toLowerCase() !== "saving")
                    return NextResponse.json({message: 'Account type can only be savings or current'}, {status: 400});
                data = {accountType: new_value};
                break;
            default:
                return NextResponse.json({message: `Invalid Field to Update value: ${field_to_update}`}, {status: 400})

        }


        const isUpdate = await prisma.webUser.update({
            where: {
                email: email
            },
            data: data
        })

        return NextResponse.json(isUpdate);

    } catch (error: any) {
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
}