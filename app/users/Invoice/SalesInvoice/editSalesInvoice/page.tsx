'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EstimateForm, EstimateRowObject, InsuranceCompaniesData, Invoice, ServiceRowObject, Surveyor } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectCustomer from "../Components/SelectAbleInsurance";
import { InvoiceData } from "@/app/lib/Resources";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/ui/loader";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectSurveyor from "../Components/SelectAbleSurveyor";
import SelectPayment from "../Components/SelectAblePayment";
import Navbar from "@/app/users/Navbar";
import Footer from "@/app/users/Footer";
import InvoiceTable from "../Components/InvoiceTable";
import InvoiceSummary, { percentageOfValue } from "../Components/SalesInvoiceSummary";
import toast from "react-hot-toast";

// TODO Either you can do everything on this single page to sort out every issue by assinging issues manually to const invoice
// TODO or you can sync form data with invoice data somehow and then send it to API

export default function PAGE() {
    const [isFormUpdating, setFormUpdating] = useState(false);
    const [invoice, setInvoice] = useState<Invoice>();
    const [insurance, setInsurance] = useState<InsuranceCompaniesData>();
    const [isSearchLoading, setSearchLoading] = useState(false);
    const [surveyor, setSurveyor] = useState<Surveyor>();
    const [payment, setPayment] = useState<string>('');
    const [invoiceRows, setInvoiceRows] = useState<EstimateRowObject>({});
    const [isGenerateSummary, setIsGenerateSummary] = useState(false);
    const [isFoundEstimate, setIsFoundEstimate] = useState(false);

    const searchParams = useSearchParams();
    const id = parseInt(searchParams.get('id')!);

    const fetchInvoice = async (id: number) => {
        axios.post("/api/getInvoice", { id })
            .then((res: AxiosResponse) => {
                setInvoice(res.data.Message);
                let myParts = res.data.Message.PartsTable;
                setInvoiceRows(JSON.parse(myParts));
            })
            .catch((error: AxiosError) => console.log(error))
    }


    useEffect(() => {
        const fetchData = async () => {
            await fetchInvoice(id);
        }
        fetchData();
    }, [])

    const {
        register,
        setValue,
        handleSubmit,
    } = useForm<Invoice>({
        defaultValues: invoice,
    });

    const onSubmit: SubmitHandler<Invoice> = async (data) => {
        console.log(invoice, data);
    }
    // Calculating Total Price
    function CalculateTotalPrice(servicesRows: ServiceRowObject) {
        let totalServiceCost = 0;
        Object.keys(servicesRows).map((key, index) => {
            totalServiceCost += servicesRows[key].charges;
        });

        return totalServiceCost;
    }

    const fetchEstimate = async (id: number) => {
        setIsFoundEstimate(true);
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
                InvoiceData.InsuranceNTN = myData?.NTN;
                InvoiceData.InsuranceGSTR = myData?.GSTR;
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
                setInvoiceRows(partRows);
                InvoiceData.PartsTable = partRows;

                // * End
                toast.success('Estimate Found');
            })
            .catch((error: AxiosResponse) => toast.error('Estimate Not Found!'))
            .finally(() => setIsFoundEstimate(false));
    }
    return (
        invoice &&
        <div>
            <Navbar />
            <h1 className="flex text-center justify-center text-3xl font-bold">Update Sales Tax</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            <Input type="text" placeholder={`${invoice.InsuranceNTN}`} onChange={(e) => {
                                setValue('InsuranceNTN', e.target.value);
                            }} disabled={true} />
                        </div>
                        <div>
                            <Label className="text-sm">
                                GSTR
                            </Label>
                            <Input type="text" placeholder={`${invoice.InsuranceGSTR}`} disabled={true} />
                        </div>
                        <div>
                            <Label className="text-sm">
                                Reigstration Number
                            </Label>
                            <Input id="regno" type="text" defaultValue={`${invoice.CarRegNum}`} onChange={(e) => {
                                invoice.CarRegNum = e.target.value;
                            }} placeholder="Car Registration Number" required />
                        </div>
                        <div>
                            <Label className="text-sm">
                                Make
                            </Label>
                            <Input id="make" type="text" defaultValue={`${invoice.CarMake}`} onChange={(e) => {
                                invoice.CarMake = e.target.value;
                            }} placeholder="Car Make" required />
                        </div>
                        <div>
                            <Label className="text-sm">
                                Model
                            </Label>
                            <Input id="model" type="text" defaultValue={`${invoice.CarModel}`} onChange={(e) => {
                                invoice.CarModel = e.target.value;
                            }} placeholder="Car Model" required />
                        </div>
                        <div>
                            <Label className="text-sm">
                                Driver User
                            </Label>
                            <Input id="driver" type="text" defaultValue={`${invoice.DriverUser}`} onChange={(e) => {
                                invoice.DriverUser = e.target.value;
                            }} placeholder="Username" required />
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
                            <Input id="loss" type="text" placeholder="Loss Number" defaultValue={invoice.LossNumber} />
                        </div>
                        <div>
                            <Label className="text-sm">
                                Estimate Number
                            </Label>
                            <Input type="number" placeholder="Estimate Number" defaultValue={invoice.EstimateNum} onChange={(e) => {
                                invoice.EstimateNum = parseInt(e.target.value);
                            }} />
                        </div>
                        <div>
                            <Button
                                className="mt-[1.5rem] w-full flex flex-row gap-1"
                                variant={'outline'}
                                type="button"
                                disabled={isFoundEstimate}
                                onClick={async () => {
                                    await fetchEstimate(invoice.EstimateNum);
                                }}>
                                Search Estimate
                                <Loader isLoading={isFoundEstimate} />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-40">
                        <InvoiceTable
                            invoiceRows={invoiceRows}
                            setRows={setInvoiceRows}
                            setGenerateSummary={setIsGenerateSummary}
                            setValue={setValue}
                            invoice={invoice} />
                        <div className="mt-20">
                            {isGenerateSummary &&
                                <InvoiceSummary invoiceRows={invoiceRows} setValue={setValue} invoice={invoice}/>
                            }
                        </div>
                    </div>
                </div>
                <div className="container flex items-center justify-center">
                    <Button type="submit" className="flex flex-row gap-1" disabled={isFormUpdating || !isGenerateSummary}>
                        Update
                        <Loader isLoading={isFormUpdating} />
                    </Button>
                </div>
            </form>
            <Footer />
        </div>
    )
}