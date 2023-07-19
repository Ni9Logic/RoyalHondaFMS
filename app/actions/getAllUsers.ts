import prisma from "../lib/prismadb"

export default async function getAllUsers() {
    try {
        const allUsers = (await prisma.webUser.findMany()).map(user => ({
            ...user,
            fullname: user.fullname || ',',
            email: user.email || ',',
            phone: user.phone || ',',
            accountType: user.accountType || ',',
        }));

        if (!allUsers)
            return null;

        return allUsers;
    } catch (error: any) {
        console.log(error)
        return null;
    }
}