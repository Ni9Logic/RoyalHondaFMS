import prisma from "@/app/lib/prismadb";

export const getAllParts = async () => {
    try {
        const allParts = await prisma.priceSheet.findMany();

        if (!allParts) {
            return null;
        }

        return allParts;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}