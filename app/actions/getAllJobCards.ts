import prisma from "@/app/lib/prismadb";

const getAllJobCards = async () => {
    try {
        const allJobCards = await prisma.jobCard.findMany({
            orderBy: {
                SerialNo: 'desc'
            }
        });

        if (!allJobCards) {
            return null;
        }

        return allJobCards;
    } catch (error: any) {
        return null;
    }
}

export default getAllJobCards;