import { JOBFormData } from "@/app/users/jobCards/editJob/page";
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    try {
        const body: JOBFormData = await request.json();
        const {
            SerialNo,
            CustomerName,
            DriverUser,
            CellNo,
            JobCheckedBy,
            WorkType,
            Status,
            Insurance,
            RegistrationNumber,
            RequiredWorkDetails,
            OtherAdditionalWorkDetails,
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
        const serial = parseInt(SerialNo);
        const isUpdated = await prisma.jobCard.update({
            where: {
                SerialNo: serial,
            },
            data: {
                CustomerName: CustomerName,
                DriverUser: DriverUser,
                CellNo: CellNo,
                JobCheckedBy: JobCheckedBy,
                WorkType: WorkType,
                Status: Status,
                Insurance: Insurance,
                carRegistration: RegistrationNumber,
                RequiredWorkDetails: RequiredWorkDetails,
                OtherAddionalWorkDetails: OtherAdditionalWorkDetails,
                Fuel: Fuel,
                Mileage: Mileage,
                Lighter: Lighter,
                Ashtray: Ashtray,
                FloorMats: FloorMats,
                OriginalBook: OriginalBook,
                SeatCovers: SeatCovers,
                RadioAntena: RadioAntena,
                SpareWheel: SpareWheel,
                WheelRod: WheelRod,
                JackHandle: JackHandle,
                Tools: Tools,
                ExtraThings: ExtraThings,
                FrameNo: FrameNo,
                BatteryNumber: BatteryNumber,
                InReceivedBy: InReceivedBy,
                InReceivedFrom: InReceivedFrom,
                InTime: InTime,
                OutReceivedBy: OutReceivedBy,
                OutReceivedFrom: OutReceivedFrom,
                OutTime: OutTime,
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