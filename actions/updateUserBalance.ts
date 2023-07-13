import prisma from "../app/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const updateBalance = async (balance: number | null | undefined) => {
    const user = await getCurrentUser();

    if (!balance || !user || !user?.Balance)
        return null

   

    if (!user?.email)
        return null;
    const newBalance = balance + user?.Balance;
    try {
        const update = await prisma.webUser.update({
            where: {
                email: user?.email as string,
            },
            data: {
                Balance: newBalance,
            }
        });

        return update;
    } catch (error: any) {
        return null;
    }

}

export default updateBalance;