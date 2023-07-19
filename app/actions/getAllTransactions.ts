import prisma from "../lib/prismadb";

const getAllTransactions = async () => {
    try {
        const getAllTransactions = await prisma.webTransactions.findMany()
        if (!getAllTransactions)
            return null;

        return getAllTransactions;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}

export default getAllTransactions;