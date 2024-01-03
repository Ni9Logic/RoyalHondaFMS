import { JOBFormData } from "@/types";
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    try {
        const body: JOBFormData = await request.json();
    
        const serial = body.SerialNo;
        const isUpdated = await prisma.jobCard.update({
            where: {
                SerialNo: serial,
            },
            data: {
                CustomerName: body.CustomerName,
                DriverUser: body.DriverUser,
                CellNo: body.CellNo,
                JobCheckedBy: body.JobCheckedBy,
                WorkType: body.WorkType,
                Make: body.Make,
                Model: body.Model,
                Status: body.Status,
                Insurance: body.Insurance,
                carRegistration: body.RegistrationNumber,
                RequiredWorkDetails: body.RequiredWorkDetails,
                OtherAddionalWorkDetails: body.OtherAdditionalWork,
                Fuel: body.Fuel,
                Mileage: body.Mileage,
                Lighter: body.Lighter,
                Ashtray: body.Ashtray,
                FloorMats: body.FloorMats,
                OriginalBook: body.OriginalBook,
                SeatCovers: body.SeatCovers,
                RadioAntena: body.RadioAntena,
                SpareWheel: body.SpareWheel,
                WheelRod: body.WheelRod,
                JackHandle: body.JackHandle,
                Tools: body.Tools,
                ExtraThings: body.ExtraThings,
                FrameNo: body.FrameNo,
                BatteryNumber: body.BatteryNumber,
                InReceivedBy: body.InReceivedBy,
                InReceivedFrom: body.InReceivedFrom,
                InTime: body.InTime,
                OutReceivedBy: body.OutReceivedBy,
                OutReceivedFrom: body.OutReceivedFrom,
                OutTime: body.OutTime,
                CreatedAt: new Date().toLocaleDateString(),
            }
        })
        if (!isUpdated) {
            return NextResponse.json({ Message: "Error While Updating" }, { status: 404 });
        }

        return NextResponse.json({ Message: "Updated Successfully!" }, { status: 200 });
    } catch (error: any) {
        NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
    }
}