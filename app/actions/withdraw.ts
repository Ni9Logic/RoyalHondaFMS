import prisma from "../lib/prismadb";
import { webUser } from "@prisma/client";
import { toast } from "react-hot-toast";

const withdraw = async (amount: number, user: webUser) => {
    try {
        if (user?.Balance !== null || user?.Balance !== undefined) {
            return null;
        }
        const newBalance = { Balance: user?.Balance - amount }

        if (newBalance.Balance > user?.Balance) {
            toast.error('Amount much be less than balance');
            return null;
        }
        if (amount <= 0) {
            toast.error('Amount must be valid');
            return null;
        }

        const update = await prisma.webUser.update({
            where: {
                email: user?.email as string,
            },
            data: {Balance: newBalance.Balance},
        })

        return update;

    } catch (error: any) {
        console.error(error);
    }
}

export default withdraw;