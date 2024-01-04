import { InvoiceData } from "@/app/lib/Resources";

export const InvoiceSummary = () => {
    return (
        <>
            {
                Object.keys(InvoiceData.PartsTable).map((key, index) => (
                    <p key={key}>{InvoiceData.PartsTable[key].partDesc}</p>
                ))
            }
        </>
    )
}

export default InvoiceSummary;