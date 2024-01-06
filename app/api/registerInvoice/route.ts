import { Invoice } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
    try {
        const getData = await req.json();
        const body: Invoice = getData.Data;
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
                InvoiceType: body.InvoiceType,
                InsuranceName: body.InsuranceName,
                InsuranceGSTR: body.InsuranceGSTR,
                InsuranceNTN: body.InsuranceNTN,
                PartsTable: partsTable,
                PaymentMode: body.PaymentMode,
                PSTCost: body.PSTCost,
                PSTPercent: body.PSTPercent,
                SurveyorName: body.SurveyorName,
                TAmountDep: body.TAmountDep,
                TAmountGST: body.TAmountGST,
                TAmountPart: body.TAmountPart,
                TLaborAmount: body.TLaborAmount,
                TLaborAmountPST: body.TLaborAmountPST,
                LossNumber: body.LossNumber,
            }
        })

        if (!isCreated) return NextResponse.json({ Message: "Error While Creating Invoice" }, { status: 400 });

        return NextResponse.json({ Message: "Invoice Registered!" }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 });
    }
}