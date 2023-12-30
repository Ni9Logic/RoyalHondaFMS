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

        


        // Get the current date
        const currentDate = new Date();

        // Extract the year, month, and day
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based
        const day = currentDate.getDate();

        // Format the date as a string (e.g., "2023-12-23")
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        // Create JobCard
        const jobcard = await prisma.jobCard.create({
            data: {
                CustomerName,
                DriverUser,
                CellNo,
                JobCheckedBy,
                WorkType,
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
                CreatedAt: formattedDate,
            },
        });
        return NextResponse.json({ jobcard });
    } catch (error: any) {
        console.log(error, "Error in registration");
        return new NextResponse('Internal Error', { status: 500 });
    }
}
