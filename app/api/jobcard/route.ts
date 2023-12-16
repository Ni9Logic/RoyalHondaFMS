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
            WorkOrder,
            CashWorks,
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
            In, // Assuming In is a string
            Out, // Assuming Out is a string
        } = body;

        const jobcard = await prisma.jobCard.create({
            data: {
                CustomerName,
                DriverUser,
                CellNo,
                JobCheckedBy,
                WorkType,
                Insurance,
                WorkOrder,
                CashWorks,
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
                In, // Assuming In is a string
                Out, // Assuming Out is a string
            }
        })
        return NextResponse.json(jobcard);
    } catch (error: any) {
        console.log(error, "Error in registration");
        return new NextResponse('Internal Error', { status: 500 });
    }
}