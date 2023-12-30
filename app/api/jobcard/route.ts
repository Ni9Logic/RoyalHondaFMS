import { JOBFormData } from "@/app/users/createJobCard/page";
import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body: JOBFormData = await request.json();
        const {
            CustomerName,
            DriverUser,
            CellNo,
            JobCheckedBy,
            WorkType,
            Make,
            Model,
            Status,
            Insurance,
            RegistrationNumber,
            RequiredWorkDetails,
            OtherAdditionalWork,
            Fuel,
            Mileage,
            Lighter,
            Ashtray,
            FloorMats,
            OriginalBook,
            SeatCovers,
            RadioAntena,
            SpareWheel,
            WheelRod,
            JackHandle,
            Tools,
            ExtraThings,
            FrameNo,
            BatteryNumber,
            InReceivedBy,
            InReceivedFrom,
            InTime,
            OutReceivedBy,
            OutReceivedFrom,
            OutTime,
        } = body;

            
        const jobcard = await prisma.jobCard.create({
            data: {
                CustomerName,
                DriverUser,
                CellNo,
                JobCheckedBy,
                WorkType,
                Make,
                Model,
                Status,
                Insurance,
                RequiredWorkDetails,
                AdditionalWorkDetails: OtherAdditionalWork,
                OtherAddionalWorkDetails: OtherAdditionalWork,
                carRegistration: RegistrationNumber,
                Fuel,
                Mileage,
                Lighter,
                Ashtray,
                FloorMats,
                OriginalBook,
                SeatCovers,
                RadioAntena,
                SpareWheel,
                WheelRod,
                JackHandle,
                Tools,
                ExtraThings,
                FrameNo,
                BatteryNumber,
                InReceivedBy,
                InReceivedFrom,
                InTime: InTime,
                OutReceivedBy,
                OutReceivedFrom,
                OutTime: OutTime,
                CreatedAt: new Date().toLocaleDateString(),
            },
        });
        return NextResponse.json({ jobcard });
    } catch (error: any) {
        console.log(error, "Error in registration");
        return new NextResponse('Internal Error', { status: 500 });
    }
}
