import { InvoiceData } from "@/app/lib/Resources";
import { EstimateRowObject, Invoice } from "@/types";
import React from "react";
import { UseFormSetValue } from "react-hook-form";


function totalPartsPrice(invoiceRows: EstimateRowObject) {
    let totalPartsPrice = 0;
    Object.keys(invoiceRows).map((key, index) => {
        totalPartsPrice += invoiceRows[key].partTotalPrice;
    })
    return totalPartsPrice;
}

function percentageOfValue(Percentvalue: number, total: number) {
    return (Percentvalue * total) / 100;
}

function totalPartsCostGST(invoiceRows: EstimateRowObject) {
    return totalPartsPrice(invoiceRows) + percentageOfValue(18, totalPartsPrice(invoiceRows));
}

interface InvoiceSummaryProps {
    invoiceRows: EstimateRowObject,
    setValue: UseFormSetValue<Invoice>,
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ invoiceRows, setValue }: InvoiceSummaryProps) => {
    // Get the current date
    const currentDate = new Date();

    // Extract the year, month, and day
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const day = currentDate.getDate();

    // Format the date as a string (e.g., "2023-12-23")
    const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;

    InvoiceData.TAmountPart = totalPartsPrice(invoiceRows);
    InvoiceData.GSTPercent = 18;
    InvoiceData.GSTCost = percentageOfValue(18, totalPartsPrice(invoiceRows));
    InvoiceData.TAmountGST = totalPartsCostGST(invoiceRows);
    InvoiceData.DepCost = percentageOfValue(InvoiceData.DepPercent, InvoiceData.TAmountGST);
    InvoiceData.TAmountDep = Math.max(InvoiceData.DepCost, InvoiceData.TAmountGST) - Math.min(InvoiceData.DepCost, InvoiceData.TAmountGST);
    InvoiceData.PSTCost = percentageOfValue(InvoiceData.PSTPercent, InvoiceData.TLaborAmount);
    InvoiceData.TLaborAmountPST = InvoiceData.TLaborAmount - InvoiceData.PSTCost;
    InvoiceData.GrandTAmount = InvoiceData.TLaborAmountPST + InvoiceData.TAmountDep;
    InvoiceData.CreatedAt = formattedDate;

    setValue('TAmountPart', InvoiceData.TAmountPart);
    setValue('GSTPercent', InvoiceData.GSTPercent);
    setValue('GSTCost', InvoiceData.GSTCost);
    setValue('TAmountGST', InvoiceData.TAmountGST);
    setValue('DepPercent', InvoiceData.DepPercent);
    setValue('DepCost', InvoiceData.DepCost);
    setValue('TLaborAmount', InvoiceData.TLaborAmount);
    setValue('TAmountDep', InvoiceData.TAmountDep);
    setValue('PSTPercent', InvoiceData.PSTPercent);
    setValue('PSTCost', InvoiceData.PSTCost);
    setValue('TLaborAmountPST', InvoiceData.TLaborAmountPST);
    setValue('GrandTAmount', InvoiceData.GrandTAmount);
    setValue('InvoiceType', "Sales Tax");
    setValue('CreatedAt', InvoiceData.CreatedAt);


    return (
        <div className="ml-auto w-1/4">
            {/* Heading */}
            <hr className="border border-t-1 border-black" />
            <div className="flex items-center flex-col">
                Invoice Summary
            </div>
            <hr className="border border-t-1 border-black" />

            {/* Parts Total */}
            <p className="text-sm flex flex-row gap-1">
                <b>Parts Cost:</b> {InvoiceData.TAmountPart.toLocaleString()} Rs
            </p>
            <p className="text-sm flex flex-row gap-1">
                <b>{InvoiceData.GSTPercent}% GST:</b> {InvoiceData.GSTCost.toLocaleString()} Rs
            </p>

            {/* Total Parts Cost */}
            <p className="text-sm flex flex-row gap-1">
                <b>Total Parts Cost:</b> {InvoiceData.TAmountGST.toLocaleString()} Rs
            </p>
            <p className="text-sm flex flex-row gap-1">
                <b>{InvoiceData?.DepPercent}% Dep On Parts:</b> {InvoiceData.DepCost.toLocaleString()} Rs
            </p>
            <p className="text-sm flex flex-row gap-1">
                <b>Parts after Dep:</b> {InvoiceData.TAmountDep.toLocaleString()} Rs
            </p>
            <p className="text-sm flex flex-row gap-1">
                <b>Labor Cost:</b> {InvoiceData.TLaborAmount.toLocaleString()} Rs
            </p>
            <p className="text-sm flex flex-row gap-1">
                <b>{InvoiceData?.PSTPercent}% PST On Labor:</b> {InvoiceData.PSTCost.toLocaleString()} Rs
            </p>
            <p className="text-sm flex flex-row gap-1">
                <b>Labor after PST:</b> {InvoiceData.TLaborAmountPST.toLocaleString()} Rs
            </p>
            <p className="text-sm flex flex-row gap-1">
                <b>Grand Total:</b> {InvoiceData.GrandTAmount.toLocaleString()} Rs
            </p>
        </div>
    )
}

export default InvoiceSummary;