import { InsuranceCompaniesData } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body: InsuranceCompaniesData = await req.json();
    if (!body.name || body.name.length === 0)
      return NextResponse.json(
        { Message: "No Name Provided" },
        { status: 404 }
      );

    if (!body.NTN || body.NTN.length === 0)
      return NextResponse.json({ Message: "No ID Provided" }, { status: 404 });

    const isFound = await prisma.insuranceCompanies.findUnique({
      where: {
        name: body.name,
      },
    });

    if (isFound) {
      return NextResponse.json(
        { Message: "Company with name already exists!" },
        { status: 404 }
      );    
    }

    const isCreated = await prisma.insuranceCompanies.create({
      data: {
        name: body.name,
        NTN: body.NTN,
        GSTR: body.GSTR,
      },
    });

    if (!isCreated)
      return NextResponse.json(
        { Message: "Error Creating Company" },
        { status: 404 }
      );

    return NextResponse.json({ Message: "Company Created" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { Message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
