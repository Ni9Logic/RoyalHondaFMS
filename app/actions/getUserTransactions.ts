import getCurrentUser from "./getCurrentUser";

const getUserTransactions = async () => {
    try {
        const user = await getCurrentUser();
        if (!user)
            return null;

        const allTransactions = prisma?.webTransactions.findMany({
            where: {
                OR: [
                    {AccountHolder_email: user?.email},
                    {Receipent_email: user?.email}
                ]
            }
        })

        if (!allTransactions)
            return null;

        return allTransactions;

    } catch (error: any) {
        return null;
    }
}

export default getUserTransactions();