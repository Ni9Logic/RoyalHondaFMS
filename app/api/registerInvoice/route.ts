import { Invoice } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
    try {
        const body: Invoice = await req.json();
        let partsTable = JSON.stringify(body.PartsTable);

        const isCreated = await prisma.invoice.create({
            data: {
                CarMake: body.CarMake,
                CarModel: body.CarModel,
                CarRegNum: body.CarRegNum,
                CreatedAt: body.CreatedAt,
                DepCost: body.DepCost,
                DepPercent: body.DepPercent,
                DriverUser: body.DriverUser,
                EstimateNum: body.EstimateNum,
                GrandTAmount: body.GrandTAmount,
                GSTCost: body.GSTCost,
                GSTPercent: body.GSTPercent,
            }
        })

        return NextResponse.json({ Message: "Invoice registered" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}