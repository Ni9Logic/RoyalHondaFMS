'use client'
import { InvoiceData } from "@/app/lib/Resources";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Invoice } from "@/types";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

interface SelectPaymentProps {
    setPayment: (payment: string) => void,
    setValueForm: UseFormSetValue<Invoice>,
}
export const SelectPayment: React.FC<SelectPaymentProps> = ({ setPayment, setValueForm }: SelectPaymentProps) => {
    return (
        <>
            <Select onValueChange={(e) => {
                setValueForm('PaymentMode', e);
                setPayment(e);
                InvoiceData.PaymentMode = e;
            }}>
                <SelectTrigger>
                    <SelectValue placeholder={`${InvoiceData.PaymentMode ? InvoiceData.PaymentMode : 'Payment Mode'}`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="CASH">CASH</SelectItem>
                    <SelectItem value="CHEQUE">CHEQUE</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}

export default SelectPayment;