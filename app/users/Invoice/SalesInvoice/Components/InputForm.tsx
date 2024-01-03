'use client'
import { InvoiceData } from "@/app/lib/Resources";
import { Input } from "@/components/ui/input";
import { InsuranceCompaniesData, Invoice, Surveyor } from "@/types";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SelectCustomer } from "./SelectAbleInsurance";
import SelectSurveyor from "./SelectAbleSurveyor";

interface InputFormProps {
    setValue: UseFormSetValue<Invoice>
    register: UseFormRegister<Invoice>
}

const InputForm: React.FC<InputFormProps> = ({ setValue, register }: InputFormProps) => {
    const [insurance, setInsurance] = useState<InsuranceCompaniesData>();
    const [surveyor, setSurveyor] = useState<Surveyor>();
    const currentDate = new Date();

    // Extract the year, month, and day
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const day = currentDate.getDate();

    // Format the date as a string (e.g., "2023-12-23")
    const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;



    return (
        <div className="w-full items-center flex flex-col">
            <div className="grid grid-cols-3 mt-20 gap-2">
                <div>
                    <Label className="text-sm">
                        Sales Tax Number
                    </Label>
                    <Input type="text" placeholder="3277876138009" disabled={true} />
                </div>
                <div>
                    <Label className="text-sm">
                        NTN
                    </Label>
                    <Input type="text" placeholder="7522464-3" disabled={true} />
                </div>
                <div>
                    <Label className="text-sm">
                        GSTR
                    </Label>
                    <Input type="text" placeholder="3277-87613-8009" disabled={true} />
                </div>
                <div className="mt-[1.5rem]">
                    <SelectCustomer setInsurance={setInsurance} setValueForm={setValue} />
                </div>
                <div>
                    <Label className="text-sm">
                        NTN
                    </Label>
                    <Input type="text" placeholder={`${insurance?.NTN}`} disabled={true} />
                </div>
                <div>
                    <Label className="text-sm">
                        GSTR
                    </Label>
                    <Input type="text" placeholder={`${insurance?.GSTR}`} disabled={true} />
                </div>
                <div>
                    <Label className="text-sm">
                        Reigstration Number
                    </Label>
                    <Input type="text" placeholder="Car Registration Number" {...register('CarRegNum')} />
                </div>
                <div>
                    <Label className="text-sm">
                        Make
                    </Label>
                    <Input type="text" placeholder="Car Make" {...register('CarMake')} />
                </div>
                <div>
                    <Label className="text-sm">
                        Model
                    </Label>
                    <Input type="text" placeholder="Car Model" {...register('CarModel')} />
                </div>
                <div>
                    <Label className="text-sm">
                        Driver User
                    </Label>
                    <Input type="text" placeholder="Username" {...register('DriverUser')} />
                </div>
                <div className="mt-[1.5rem]">
                    <SelectSurveyor setSurveyor={setSurveyor} setValueForm={setValue} />
                </div>
                <div>
                    <Label className="text-sm">
                        Payment Mode
                    </Label>
                    <Input type="text" placeholder="Selectable Soon" disabled={true} />
                </div>
            </div>
            <div className="w-2/6 flex flex-col justify-center mt-5">
                <Label className="text-sm">
                    Loss Number
                </Label>
                <Input type="text" placeholder="Loss Number" {...register('LossNumber')} />
            </div>
        </div>
    )
}

export default InputForm;