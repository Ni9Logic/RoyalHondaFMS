import prisma from "../lib/prismadb";

const getUser = async (email: string) => {
    try {

        if (!email) return null;

        // Getting our user
        const user = await prisma.webUser.findUnique({
            where: {
                email: email
            }
        });

        // User doesn't exist
        if (!user) return null;


        return user;
    } catch (error: any) {
        return null;
    }
}

export default getUser;