import prisma from "@/app/lib/prismadb";

export default async function getAllSurveyor() {
    try {
        const surveyors = await prisma?.surveyors.findMany();

        if (!surveyors)
            return null;

        return surveyors;
    } catch (error: any) {
        return null;
    }
}