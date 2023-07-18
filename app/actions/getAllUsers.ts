import prisma from "../lib/prismadb"

type User = {
    id: string;
    fullname: string | null;
    email: string | null;
    phone: string | null;
    admin: boolean | null;
    accountType: string | null;
    Balance: number | null;
    hashedPassword: string | null;
    createdAt: Date;
};
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