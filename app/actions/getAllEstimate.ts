import prisma from "../lib/prismadb";

export default async function getAllEstimates() {
    try {
        const allEstimates = await prisma.estimatedCostWork.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        if (!allEstimates)
            return null;

        return allEstimates;
    } catch (error: any) {
        return null;
    }
}