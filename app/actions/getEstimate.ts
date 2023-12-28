import prisma from "../lib/prismadb";

const getEstimate = async (id: number) => {
    try {
        if (!id)
            return null;

        // Getting Estimate with Estimate ID
        const estimate = await prisma.estimatedCostWork.findUnique({
            where: {
                id: id
            }
        })

        // Not Found
        if (!estimate)
            return null;

        return estimate;
    } catch (error: any) {
        return null;
    }
}

export default getEstimate;