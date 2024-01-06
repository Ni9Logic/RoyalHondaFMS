'use client'
import { InvoiceData } from "@/app/lib/Resources";
import { Input } from "@/components/ui/input";
import { EstimateForm, EstimateRowObject, InsuranceCompaniesData, Invoice, ServiceRowObject, ServicesDetailsType, Surveyor } from "@/types";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { SelectCustomer } from "./SelectAbleInsurance";
import SelectSurveyor from "./SelectAbleSurveyor";
import SelectPayment from "./SelectAblePayment";
import { Button } from "@/components/ui/button";
import axios, { Axios, AxiosResponse } from "axios";
import Loader from "@/app/components/ui/loader";
import toast from "react-hot-toast";
import { percentageOfValue } from "./SalesInvoiceSummary";

interface InputFormProps {
    setValue: UseFormSetValue<Invoice>
    register: UseFormRegister<Invoice>
}


const InputForm: React.FC<InputFormProps> = ({ setValue, register }: InputFormProps) => {
    const [insurance, setInsurance] = useState<InsuranceCompaniesData>();
    const [isSearchLoading, setIsSearchLoading] = useState(false);

    // Used for Selection Tables to persist the data
    const [surveyor, setSurveyor] = useState<Surveyor>();
    const [payment, setPayment] = useState<string>('');

    // Calculating Total Price
    function CalculateTotalPrice(servicesRows: ServiceRowObject) {
        let totalServiceCost = 0;
        Object.keys(servicesRows).map((key, index) => {
            totalServiceCost += servicesRows[key].charges;
        });

        return totalServiceCost;
    }

    // Testing a new technique
    const fetchEstimate = async (id: number) => {
        setIsSearchLoading(true);
        axios.post('/api/getEstimate', { id })
            .then((response: AxiosResponse) => {
                let myData: EstimateForm = response?.data?.Message;

                // Setting Values in the form from Estimate Data

                // Setting totalCost of serviceRows
                // @ts-ignore
                let servicesRows = JSON.parse(myData?.ServicesTableData);
                let serviceCost = CalculateTotalPrice(servicesRows);
                InvoiceData.TLaborAmount = percentageOfValue(myData?.DiscountServices, serviceCost) - myData?.DiscountServicesFigure;
                setValue("TLaborAmount", InvoiceData.TLaborAmount);

                // Setting Insurance
                setInsurance({ name: myData?.Insurance, NTN: myData?.NTN, GSTR: myData?.GSTR });
                InvoiceData.InsuranceName = myData?.Insurance;
                setValue("InsuranceName", InvoiceData.InsuranceName);
                setValue("InsuranceNTN", myData?.NTN);
                setValue("InsuranceGSTR", myData?.GSTR);

                // Setting Registration Number
                InvoiceData.CarRegNum = myData?.cRegistration;
                setValue("CarRegNum", InvoiceData.CarRegNum);

                // Setting Car Make
                InvoiceData.CarMake = myData?.cMake;
                setValue("CarMake", InvoiceData.CarMake);

                // Setting Car Model
                InvoiceData.CarModel = myData?.cModel;
                setValue("CarModel", InvoiceData.CarModel);

                // Setting Driver User
                InvoiceData.DriverUser = myData?.cDriverUser;
                setValue("DriverUser", InvoiceData.DriverUser);

                // Setting Surveyor
                setSurveyor({ cSurveyor: myData?.cSurveyor, id: 0 });
                setValue("SurveyorName", myData?.cSurveyor);
                InvoiceData.SurveyorName = myData?.cSurveyor;

                // Setting Payment Mode
                setPayment(myData?.PaymentMode);
                setValue("PaymentMode", myData?.PaymentMode);
                InvoiceData.PaymentMode = myData?.PaymentMode;

                // Setting Parts Table
                // @ts-ignore
                let partRows = JSON.parse(myData?.EstimateTableData);
                setValue("PartsTable", partRows);
                InvoiceData.PartsTable = partRows;

                console.log(partRows)
                // * End
                toast.success('Estimate Found');
            })
            .catch((error: AxiosResponse) => toast.error('Estimate Not Found!'))
            .finally(() => setIsSearchLoading(false));
    }

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
                    <Input id="regno" type="text" defaultValue={`${InvoiceData?.CarRegNum}`} placeholder="Car Registration Number" {...register('CarRegNum')} required />
                </div>
                <div>
                    <Label className="text-sm">
                        Make
                    </Label>
                    <Input id="make" type="text" defaultValue={`${InvoiceData?.CarMake}`} placeholder="Car Make" {...register('CarMake')} required />
                </div>
                <div>
                    <Label className="text-sm">
                        Model
                    </Label>
                    <Input id="model" type="text" defaultValue={`${InvoiceData?.CarModel}`} placeholder="Car Model" {...register('CarModel')} required />
                </div>
                <div>
                    <Label className="text-sm">
                        Driver User
                    </Label>
                    <Input id="driver" type="text" defaultValue={`${InvoiceData?.DriverUser}`} placeholder="Username" {...register('DriverUser')} required />
                </div>
                <div className="mt-[1.5rem]">
                    <SelectSurveyor setSurveyor={setSurveyor} setValueForm={setValue} />
                </div>
                <div>
                    <Label className="text-sm">
                        Payment Mode
                    </Label>
                    <SelectPayment setPayment={setPayment} setValueForm={setValue} />
                </div>
                <div>
                    <Label className="text-sm">
                        Loss Number
                    </Label>
                    <Input id="loss" type="text" placeholder="Loss Number" {...register('LossNumber')} />
                </div>
                <div>
                    <Label className="text-sm">
                        Estimate Number
                    </Label>
                    <Input type="number" placeholder="Estimate Number" onChange={(e) => {
                        setValue('EstimateNum', parseInt(e.target.value));
                        InvoiceData.EstimateNum = parseInt(e.target.value);
                    }} required />
                </div>
                <div>
                    <Button
                        className="mt-[1.5rem] w-full flex flex-row gap-1"
                        variant={'outline'}
                        type="button"
                        disabled={isSearchLoading}
                        onClick={async () => {
                            await fetchEstimate(InvoiceData.EstimateNum);
                        }}>
                        Search Estimate
                        <Loader isLoading={isSearchLoading} />
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default InputForm;