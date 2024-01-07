import { Invoice } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
    try {
        const request = await req.json();
        const body: Invoice = request.invoice;
        const isUpdated = await prisma.invoice.update({
            where: {
                id: body.id,
            },
            data: {
                CarRegNum: body.CarRegNum,
                CarMake: body.CarMake,
                CarModel: body.CarModel,
                InsuranceName: body.InsuranceName,
                InsuranceNTN: body.InsuranceNTN,
                InsuranceGSTR: body.InsuranceGSTR,
                SurveyorName: body.SurveyorName,
                DriverUser: body.DriverUser,
                PaymentMode: body.PaymentMode,
                EstimateNum: body.EstimateNum,
            }
        })

        if (!isUpdated)
            return NextResponse.json({ Message: "Failed to update" }, { status: 400 });

        return NextResponse.json({ Message: "Updated Successfully!" }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ Message: "Internal Server Error!" }, { status: 500 })
    }
}