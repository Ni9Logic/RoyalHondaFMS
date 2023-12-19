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
            In,
            Out,
        } = body;

        // Validate the RequiredWorkDetails array
        const isValid = RequiredWorkDetails.every((item: { work: string; price: string }) => {
            // Check if price can be converted to a valid number
            const priceAsNumber = parseFloat(item.price);
            return !isNaN(priceAsNumber) && priceAsNumber >= 0; // Adjust the condition as needed
        });

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid price value in Work Details' }, { status: 400 });
        }
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
        console.log(jobcard);
        return NextResponse.json(jobcard);
    } catch (error: any) {
        console.log(error, "Error in registration");
        return new NextResponse('Internal Error', { status: 500 });
    }
}