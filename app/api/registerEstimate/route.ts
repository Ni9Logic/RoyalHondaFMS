import { EstimateForm, EstimateRowType } from "@/app/users/Estimate/newEstimate/page";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    try {
        const body: EstimateForm = await request.json();

        const EstimateTableData = JSON.stringify(body.EstimateTableData);
        const ServiceTableData = JSON.stringify(body.ServicesDetailsTableData);


        // If No Job id is given create an estimate with empty id.
        if (body.jobId.length == 0) {
            const isCreated = await prisma.estimatedCostWork.create({
                data: {
                    cName: body.cName,
                    cMake: body.cMake,
                    cModel: body.cModel,
                    cKiloMeters: body.cKiloMeters,
                    CreatedAt: body.CreatedAt,
                    cRegistration: body.cRegistration,
                    DiscountEstimate: body.DiscountEstimate,
                    DiscountServices: body.DiscountServices,
                    EstimateTableData: EstimateTableData,
                    ServicesTableData: ServiceTableData,
                    PaymentMode: body.PaymentMode,
                    OverAllAmount: body.OverAllAmount,
                    TotalEstimateFee: body.TotalEstimateFee,
                    TotalServiceFee: body.TotalServiceFee,
                }
            })
            if (!isCreated)
                return NextResponse.json({ Message: "Some error occurred!" }, { status: 404 });

            return NextResponse.json({ Message: "Estimate Created" }, { status: 200 });
        }
        else {
            // Job Id Given searches for jobCard with given id
            const findJob = await prisma.jobCard.findUnique({
                where: {
                    SerialNo: parseInt(body.jobId)
                }
            })

            // Job Id Not Found Return Error
            if (!findJob)
                return NextResponse.json({ Message: "Invalid Job Id Provided" }, { status: 404 });

            // Store the job id inside jobids if job id is found inside FindJob Variable
            let jobids = findJob.SerialNo;

            // Creating Estimate
            const createEstimate = await prisma.estimatedCostWork.create({
                data: {
                    cName: body.cName,
                    cMake: body.cMake,
                    cModel: body.cModel,
                    cKiloMeters: body.cKiloMeters,
                    CreatedAt: body.CreatedAt,
                    cRegistration: body.cRegistration,
                    DiscountEstimate: body.DiscountEstimate,
                    DiscountServices: body.DiscountServices,
                    EstimateTableData: EstimateTableData,
                    ServicesTableData: ServiceTableData,
                    PaymentMode: body.PaymentMode,
                    OverAllAmount: body.OverAllAmount,
                    TotalEstimateFee: body.TotalEstimateFee,
                    TotalServiceFee: body.TotalServiceFee,
                    jobId: jobids,
                }
            })

            // Now Find the estimate with following job id
            const createdEstimate = await prisma.estimatedCostWork.findFirst({
                where: {
                    jobId: parseInt(body?.jobId)
                }
            })

            // Now lets update that job id with following estimate number
            const updateJobCard = await prisma.jobCard.update({
                where: {
                    SerialNo: parseInt(body?.jobId)
                },
                data: {
                    EstimateNumber: createEstimate?.id,
                    isEstimate: true,
                }
            })

            if (!createEstimate)
                return NextResponse.json({ Message: "Error Creating Estimate" }, { status: 404 });

            if (!createdEstimate)
                return NextResponse.json({ Message: "Error Finding Estimate ID" }, { status: 404 });

            if (!updateJobCard)
                return NextResponse.json({ Message: "Error Updating Job Card" }, { status: 404 });




            return NextResponse.json({ Message: "Job Card Created" }, { status: 200 })
        }
    } catch (error: any) {
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}