import prisma from "../../lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            CustomerName,
            DriverUser,
            CellNo,
            JobCheckedBy,
            WorkType,
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
            OutTime
        } = body;


        // Create JobCard
        const jobcard = await prisma.jobCard.create({
            data: {
                CustomerName,
                DriverUser,
                CellNo,
                JobCheckedBy,
                WorkType,
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
                InTime,
                OutReceivedBy,
                OutReceivedFrom,
                OutTime,
            },
        });

        return NextResponse.json({ jobcard });
    } catch (error: any) {
        console.log(error, "Error in registration");
        return new NextResponse('Internal Error', { status: 500 });
    }
}
