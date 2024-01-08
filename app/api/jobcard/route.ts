import { JOBFormData } from "@/types";
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
      NTN,
      GSTR,
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
      surelyCreate,
    } = body;

    // Check if user is sending request of submission again

    if (!surelyCreate) {
      // Inform user if job card already exists with same registration number
      const findJob = await prisma.jobCard.findFirst({
        where: {
          carRegistration: RegistrationNumber,
        },
        orderBy: {
          SerialNo: "desc",
        },
      });

      if (findJob) {
        const date = findJob.CreatedAt;
        return NextResponse.json(
          {
            Message: `Job Card With Given Reg No Already Created On ${date} With ID ${findJob.SerialNo}`,
          },
          { status: 203 }
        );
      }
    }

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
        NTN,
        GSTR,
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

    const isSummary = await prisma.summarySheet.create({
      data: {
        CarMake: jobcard.Make!,
        CarModel: jobcard.Model!,
        CarRegNum: jobcard.carRegistration!,
        CreatedAt: jobcard.CreatedAt!,
        ParkedStatus: jobcard.Status!,
        jobid: jobcard.SerialNo,
        UserDriver: jobcard.DriverUser!,
        ExpectedPromiseTime: jobcard.OutTime!,
      }
    })

    if (!isSummary || !jobcard)
      return NextResponse.json({ Message: "Job Card Id Already Assigned To Another Estimate." }, { status: 400 })

      if (!jobcard)
      return NextResponse.json({ Message: "An Error Occured (JobCard)" }, { status: 400 });

    return NextResponse.json({ Message: "Job Card Created!" }, { status: 200 });
  } catch (error: any) {
    console.log(error, "Error in registration");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
