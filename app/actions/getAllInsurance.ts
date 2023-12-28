import prisma from "@/app/lib/prismadb";

export default async function getAllInsurance() {
    try {
        const allInsurance = await prisma.insuranceCompanies.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        if (!allInsurance)
            return null;

        return allInsurance;
    } catch (error: any) {
        return null;
    }
}