import prisma from "@/app/lib/prismadb";

export default async function getAllInvoices() {
    try {
        const allInvoices = await prisma.invoice.findMany();
        if (!allInvoices)
            return null;

        return allInvoices;
    } catch (error: any) {
        return null;
    }
}