'use client'
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import PrintEstimate from "../printableEstimate/PrintableEstimate";
import { v4 as uuidv4 } from 'uuid';
import TableSummaries from "./Summary";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Loader from "@/app/components/ui/loader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InsuranceCompanies } from "@prisma/client";
import EstimateSheetForm from "../Components/EstimateSheetForm";
import { EstimateForm, EstimateRowObject, SearchEstimate, ServiceRowObject, Surveyor } from "@/types";
import AddSurveyor from "../Components/AddSurveyor";

export default function PAGE() {
    // Get the current date
    const currentDate = new Date();

    // Extract the year, month, and day
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const day = currentDate.getDate();

    // Format the date as a string (e.g., "2023-12-23")
    const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    const [cName, setcName] = useState('');

    // Convert this to integer later in the api
    const [jobId, setjobId] = useState('');

    const [cMake, setcMake] = useState('');
    const [ckiloMeters, setcKiloMeters] = useState(0);
    const [cModel, setcModel] = useState('');
    const [cRegistration, setcRegistration] = useState('');
    const [PaymentMode, setPaymentMode] = useState('');
    const [cSurveyor, setcSurveyor] = useState('');
    const [NTN, setNTN] = useState('');
    const [GSTR, setGSTR] = useState('');
    const [cDriverUser, setcDriverUser] = useState('');
    const [insurance, setInsurance] = useState('');
    const [isRoyal, setIsRoyal] = useState(true);
    const [estId, setEstId] = useState('');


    const [servicesDetailsRows, setServicesDetailsRow] = useState<ServiceRowObject>({})
    const [estimateRows, setEstimateRows] = useState<EstimateRowObject>({});

    const handleAddEstimateRow = () => {
        const obj = { ...estimateRows };
        obj[uuidv4()] = {
            partNo: '',
            partDesc: '',
            partQty: 1,
            partPrice: 0,
            partTotalPrice: 0
        };
        setEstimateRows(obj);

    };

    const handleAddServicesDetailsRow = () => {
        const obj = { ...servicesDetailsRows };
        obj[uuidv4()] = {
            details: '',
            charges: 0,
        };

        setServicesDetailsRow(obj);
    };

    const handleRemoveServicesDetailsRow = (uuidtoRemove: string) => {
        const obj = { ...servicesDetailsRows };
        delete obj[uuidtoRemove];
        setServicesDetailsRow(obj);
    }

    const handleRemoveEstimateRow = (uuidToRemove: string) => {
        const obj = { ...estimateRows };
        delete obj[uuidToRemove];
        setEstimateRows(obj);
    };


    const dynamicWidth = "50%";
    const [isGenerateSummary, setGenerateSummary] = useState(false);
    const handleGenerateSummary = () => {
        setGenerateSummary(!isGenerateSummary);
    }

    // Returns Total Parts Cost Without Discount
    function handleEstimateTotalPrice(EstimateArray: EstimateRowObject) {
        let totalPrice = 0;
        Object.keys(EstimateArray).map((key, index) => (
            totalPrice = totalPrice + EstimateArray[key].partTotalPrice
        ))

        return totalPrice;
    }

    // Returns Total Labor/Service Cost Without Discount
    function handleServicesTotalPrice(EstimateArray: ServiceRowObject) {
        let totalPrice = 0;
        Object.keys(EstimateArray).map((key, index) => (
            totalPrice = totalPrice + EstimateArray[key].charges
        ))

        return totalPrice;
    }


    const [DiscountServices, setDiscountServices] = useState(0);
    const [DiscountEstimate, setDiscountEstimate] = useState(0);
    const [DiscountServicesFigure, setDiscountServicesFigure] = useState(0);
    const [DiscountEstimateFigure, setDiscountEstimateFigure] = useState(0);


    // Returns amount after discount of Parts Cost
    function handleDiscountEstimate(totalEstimatePrice: number) {
        if (isNaN(DiscountEstimate))
            setDiscountEstimate(0);

        return (DiscountEstimate / 100) * totalEstimatePrice;
    }

    // Returns amount after discount of Service/Labor Cost
    function handleDiscountServices(totalServicesPrice: number) {
        if (isNaN(DiscountServices))
            setDiscountServices(0);

        return (DiscountServices / 100) * totalServicesPrice;
    }

    // Returns total price of parts - discounted price of parts
    function overAllBillEstimate(totalEstimatePrice: number) {
        let discounted_price_estimate = handleDiscountEstimate(totalEstimatePrice);
        return totalEstimatePrice - discounted_price_estimate;
    }

    // Returns total price of Service/Labor - discounted price of Service/Labor
    function overAllBillServices(totalServicesPrice: number) {
        let discounted_price_Service = handleDiscountServices(totalServicesPrice);
        return totalServicesPrice - discounted_price_Service;
    }

    // Returns total price of parts after discount + total price of Service/Labor after discount
    function handleOverAllBill() {
        let total_price_of_parts_after_discount = overAllBillEstimate(overAllBillEstimate(handleEstimateTotalPrice(estimateRows)));
        let total_price_of_services_after_discount = overAllBillServices(handleServicesTotalPrice(servicesDetailsRows));
        return total_price_of_parts_after_discount + total_price_of_services_after_discount;
    }

    // @ts-ignore
    const data: EstimateForm = {
        id: parseInt(estId) + 1,
        cName: cName,
        jobId: jobId,
        cMake: cMake,
        cModel: cModel,
        cSurveyor: cSurveyor,
        NTN: NTN,
        GSTR: GSTR,
        cDriverUser: cDriverUser,
        Insurance: insurance,
        EstimateTableData: estimateRows,
        ServicesDetailsTableData: servicesDetailsRows,
        DiscountServices: DiscountServices,
        DiscountEstimate: DiscountEstimate,
        DiscountServicesFigure: DiscountServicesFigure,
        DiscountEstimateFigure: DiscountEstimateFigure,
        TotalServiceFee: handleServicesTotalPrice(servicesDetailsRows),
        TotalEstimateFee: handleEstimateTotalPrice(estimateRows),
        cKiloMeters: ckiloMeters,
        CreatedAt: formattedDate,
        cRegistration: cRegistration,
        PaymentMode: PaymentMode,
        isRoyal: isRoyal,
        OverAllAmount: handleOverAllBill(),
    }

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<EstimateForm>({
        defaultValues: {
            cName: cName,
            jobId: jobId,
            cMake: cMake,
            cModel: cModel,
            cSurveyor: cSurveyor,
            NTN: NTN,
            GSTR: GSTR,
            cDriverUser: cDriverUser,
            Insurance: insurance,
            EstimateTableData: {},
            ServicesDetailsTableData: {},
            DiscountServices: 0,
            DiscountEstimate: DiscountEstimate,
            DiscountEstimateFigure: DiscountEstimateFigure,
            DiscountServicesFigure: DiscountServicesFigure,
            TotalServiceFee: 0,
            TotalEstimateFee: 0,
            cKiloMeters: ckiloMeters,
            CreatedAt: formattedDate,
            cRegistration: cRegistration,
            PaymentMode: PaymentMode,
            isRoyal: isRoyal,
            OverAllAmount: 0,
        }
    })
    const [isPrinting, setIsPrinting] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const onSubmit: SubmitHandler<EstimateForm> = async (data: EstimateForm) => {
        setLoading(true);
        axios.post("../../../api/registerEstimate", data)
            .then(() => {
                toast.success("Estimate Created!")
            })
            .catch((response: any) => {
                let error = response?.response?.data?.Message;
                toast.error(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const onAddSurveyorSubmit: SubmitHandler<Surveyor> = async (data: Surveyor) => {
        setIsAddSurveyorLoading(true);
        axios.post("../../../api/addSurveyor", data)
            .then(() => {
                toast.success("Surveyor Added!")
            })
            .catch((response: any) => {
                let error = response?.response?.data?.Message;
                toast.error(error);
            })
            .finally(() => {
                setIsAddSurveyorLoading(false);
            })
    }

    // Add Surveyor
    const {
        handleSubmit: handleAddSurveyorSubmit,
        setValue: setValueSurveyor,
    } = useForm<Surveyor>({
        defaultValues: {
            cSurveyor: cSurveyor,
        }
    })

    // Search Estimate
    const {
        register: registerSearchEstimate,
        handleSubmit: handleSubmitSearchEstimate,
    } = useForm<SearchEstimate>({
        defaultValues: {
            id: 0
        }
    })

    const [isFindLoading, setIsFindLoading] = useState(false);


    // OnSubmitSearch Function
    const onSubmitSearchEstimate: SubmitHandler<SearchEstimate> = async (data: SearchEstimate) => {
        setIsFindLoading(true);
        axios.post('/api/getEstimate', data)
            .then((response: any) => {
                // When we upload these tables to database its stringified so we have to parse it to json before we can iternate through them
                setEstimateRows(JSON.parse(response?.data?.Message?.EstimateTableData));
                setServicesDetailsRow(JSON.parse(response?.data?.Message?.ServicesTableData));
            })
            // @ts-ignore
            .catch((error: AxiosError) => toast.error(error?.response?.data?.Message))
            .finally(() => setIsFindLoading(false));
    }

    const [isAddSurveyorLoading, setIsAddSurveyorLoading] = useState(false);
    const [Surveyors, setSurveyors] = useState<Surveyor[]>();

    const getAllSurveyors = async () => {
        axios.post("../../../api/getAllSurveyor", { method: "notStatic" })
            .then((response: AxiosResponse) => setSurveyors(response?.data?.Surveyors))
            .catch((error: any) => toast.error(error?.response?.data?.Message));
    }

    const getLastEstimateId = async () => {
        axios.post("../../../api/getLastEstimateId", { method: "notStatic" })
            .then((response: AxiosResponse) => {
                setEstId(response?.data?.id);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })

    }

    const [allInsurances, setAllInsurances] = useState<InsuranceCompanies[]>();
    const getAllInsurancess = async () => {
        axios.post("../../../api/getAllInsurance", { method: "notStatic" })
            .then((response: AxiosResponse) => setAllInsurances(response?.data?.Message))
            .catch((error: any) => toast.error(error?.response?.data?.Message));
    }


    useEffect(() => {
        const fetchData = async () => {
            await getAllSurveyors();
            await getAllInsurancess();
            await getLastEstimateId();
        }

        fetchData();

    }, [])

    return (
        <>
            <form id="form2" onSubmit={handleAddSurveyorSubmit(onAddSurveyorSubmit)}></form>
            <form id="searchEstimateForm" onSubmit={handleSubmitSearchEstimate(onSubmitSearchEstimate)}></form>
            {
                !isPrinting && (
                    <div>
                        <Navbar />
                        <div className="flex-grow w-full container flex flex-col gap-2">
                            <div className="flex justify-center w-full">
                                <h1 className="text-3xl font-bold">Estimate Sheet</h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-2 mt-10">
                                <EstimateSheetForm
                                    cDriverUser={cDriverUser}
                                    cMake={cMake}
                                    cModel={cModel}
                                    cName={cName}
                                    cRegistration={cRegistration}
                                    ckiloMeters={ckiloMeters}
                                    estId={estId}
                                    formattedDate={formattedDate}
                                    isRoyal={isRoyal}
                                    jobId={parseInt(jobId)}
                                    register={register}
                                    setcDriverUser={setcDriverUser}
                                    setcMake={setcMake}
                                    setcModel={setcModel}
                                    setcName={setcName}
                                    setcRegistration={setcRegistration}
                                    setcKiloMeters={setcKiloMeters}
                                    setjobId={setjobId}
                                    setValue={setValue}
                                />

                                {/* Surveyors, Payment Mode & Insurances */}
                                <div className="flex flex-row mt-4 items-center justify-center gap-12">
                                    <div className="flex flex-row gap-1">
                                        <Select onValueChange={(e) => {
                                            let values = JSON.parse(e);
                                            setValue('cSurveyor', values.surveyorName);
                                            setcSurveyor(values.surveyorName);
                                        }} defaultValue={cSurveyor}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Surveyor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    Surveyors?.map((surveyor) => (
                                                        <SelectItem key={uuidv4()} value={
                                                            JSON.stringify({ surveyorName: surveyor.cSurveyor })
                                                        }>
                                                            {surveyor.cSurveyor}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <AddSurveyor isAddSurveyorLoading={isAddSurveyorLoading} setValueSurveyor={setValueSurveyor} />
                                    </div>
                                    <Select onValueChange={(e) => {
                                        setValue('PaymentMode', e);
                                        setPaymentMode(e);
                                    }} defaultValue={PaymentMode}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Payment Mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CASH">CASH</SelectItem>
                                            <SelectItem value="CHEQUE">CHEQUE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select onValueChange={(e) => {
                                        let values = JSON.parse(e);
                                        setValue('Insurance', values.insuranceName);
                                        setValue('NTN', values.insuranceNTN);
                                        setValue('GSTR', values.insuranceGSTR)
                                        setInsurance(values.insuranceName);
                                        setNTN(values.insuranceNTN);
                                        setGSTR(values.insuranceGSTR);
                                    }} defaultValue={insurance}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Insurance" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                allInsurances?.map((insurance) => (

                                                    <SelectItem key={uuidv4()} value={
                                                        JSON.stringify({ insuranceName: insurance.name, insuranceNTN: insurance.NTN, insuranceGSTR: insurance.GSTR })
                                                    }>
                                                        {insurance.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <Input placeholder="Insurance NTN" className="w-1/6" disabled value={NTN} />
                                    <Input placeholder="Insurance GSTR" className="w-1/6" disabled value={GSTR ? GSTR : 'Not Defined'} />
                                </div>

                                {/* Print with Royal Honda Title or Mehr Motors Title */}
                                <div className={`flex w-full flex-row gap-2 mt-4`}>
                                    <Button type="button" onClick={() => setIsRoyal(true)} className="w-full" variant={isRoyal ? 'default' : 'secondary'}>
                                        Royal Estimate
                                    </Button>
                                    <Button type="button" onClick={() => setIsRoyal(false)} className="w-full" variant={isRoyal ? 'secondary' : 'default'}>
                                        Mehr Estimate
                                    </Button>
                                </div>

                                {/* Find Estimate */}
                                <div className="mt-5 ml-auto">
                                    <div className="flex gap-1 w-full flex-col">
                                        <Label>Copy Estimate Cells</Label>
                                        <Input type="number" form="searchEstimateForm" placeholder="Find Estimate" {...registerSearchEstimate('id')} />
                                        <Button form="searchEstimateForm" className="flex flex-row gap-1" disabled={isFindLoading} type="submit">
                                            Search
                                            <Loader isLoading={isFindLoading} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Parts Estimate Cost work */}
                                <div className={"mt-32 h-full w-full flex flex-col gap-4"}>
                                    <div>
                                        {/* @ts-ignore */}
                                        <Label className={"mb-2 font-bold flex justify-center"}>Estimated Cost Work</Label>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Serial No
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Part No
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Part Desc
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Part Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Qty
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.keys(estimateRows).map((key, index) => (
                                                        <tr key={key}
                                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                <input defaultValue={estimateRows[key].partNo} onChange={(e) => {
                                                                    const updatedRows = { ...estimateRows };
                                                                    updatedRows[key].partNo = e.target.value;
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);
                                                                }}
                                                                    className={"border-none outline-none"} />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input defaultValue={estimateRows[key].partDesc} onChange={(e) => {
                                                                    const updatedRows = { ...estimateRows };
                                                                    updatedRows[key].partDesc = e.target.value;
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);
                                                                }}
                                                                    className={"border-none outline-none"} required />
                                                            </td>
                                                            <td className={"px-6 py-4"}>
                                                                <input defaultValue={estimateRows[key].partPrice} type={"number"} onChange={(e) => {
                                                                    const updatedRows = { ...estimateRows };
                                                                    updatedRows[key].partPrice = parseInt(e.target.value);
                                                                    updatedRows[key].partTotalPrice = (updatedRows[key].partPrice) * (updatedRows[key].partQty);
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);
                                                                }} className={"border-none outline-none"}
                                                                    style={{ width: dynamicWidth }} required /> Rs
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input type={"number"} onChange={(e) => {

                                                                    const updatedRows = { ...estimateRows }
                                                                    updatedRows[key].partQty = parseInt(e.target.value);
                                                                    updatedRows[key].partTotalPrice = (updatedRows[key].partPrice) * (updatedRows[key].partQty);
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);

                                                                }} className={"border-none outline-none w-[56px]"}
                                                                    defaultValue={estimateRows[key].partQty} />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className={"gap-2 flex"}>
                                                                    <button type={"button"}
                                                                        onClick={() => handleRemoveEstimateRow(key)}
                                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        {/* Discount On Parts Estimate Cost Work */}
                                        <div className={"flex flex-row gap-2"}>
                                            <Button type={"button"} className={"mt-2 w-2/6"} onChange={(e) => e.preventDefault()}
                                                onClick={() => handleAddEstimateRow()}>Add Row</Button>
                                            <Input type="number" placeholder={"Parts Discount %"}
                                                onChange={(e) => {
                                                    setDiscountEstimate(parseFloat(e.target.value));
                                                    setValue('DiscountEstimate', parseInt(e.target.value));
                                                }}
                                                className={"mt-2 flex justify-end ml-auto w-[2/6]"} defaultValue={DiscountEstimate}/>
                                        </div>
                                        <Input onChange={(e) => {
                                            setDiscountEstimateFigure(parseInt(e.target.value));
                                            setValue('DiscountEstimateFigure', parseInt(e.target.value));
                                        }}
                                            className={"mt-2 flex w-3/12 ml-auto"} type="number" placeholder={"Discount Parts (Figure)"} defaultValue={DiscountEstimateFigure}/>
                                    </div>

                                    {/* Labor Charges */}
                                    <div>
                                        <Label className={"mb-2 font-bold flex justify-center"}>Services Details and Charges</Label>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Serial No
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Services
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Charges
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.keys(servicesDetailsRows).map((key, index) => (
                                                        <tr key={index}
                                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                <input defaultValue={servicesDetailsRows[key].details}
                                                                    onChange={(e) => {
                                                                        servicesDetailsRows[key].details = e.target.value;
                                                                        const updatedRows = { ...servicesDetailsRows }
                                                                        setServicesDetailsRow(updatedRows);
                                                                        setValue('ServicesDetailsTableData', updatedRows);
                                                                    }}
                                                                    className={"border-none outline-none w-full"} />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input defaultValue={servicesDetailsRows[key].charges} type="number"
                                                                    onChange={(e) => {
                                                                        const updatedRows = { ...servicesDetailsRows }
                                                                        servicesDetailsRows[key].charges = parseInt(e.target.value)
                                                                        setServicesDetailsRow(updatedRows);
                                                                        setValue('ServicesDetailsTableData', updatedRows);
                                                                    }}
                                                                    className={"border-none outline-none w-full"}/>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className={"gap-2 flex"}>
                                                                    <button type={"button"}
                                                                        onClick={() => handleRemoveServicesDetailsRow(key)}
                                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        <div className={"gap-2 flex flex-row"}>
                                            <Button type={"button"} className={"mt-2 w-1/6"} onChange={(e) => e.preventDefault()}
                                                onClick={() => handleAddServicesDetailsRow()}>Add Row</Button>
                                            <Button type={"button"} onClick={() => {
                                                handleGenerateSummary();
                                                let completeAmount = overAllBillEstimate(handleEstimateTotalPrice(estimateRows)) + overAllBillServices(handleServicesTotalPrice(servicesDetailsRows)) - DiscountEstimateFigure - DiscountServicesFigure;
                                                setValue(('TotalEstimateFee'), overAllBillEstimate(handleEstimateTotalPrice(estimateRows)));
                                                setValue(('TotalServiceFee'), overAllBillServices(handleServicesTotalPrice(servicesDetailsRows)));
                                                setValue('EstimateTableData', estimateRows);
                                                setValue('ServicesDetailsTableData', servicesDetailsRows);
                                                setValue('OverAllAmount', completeAmount);
                                                console.log(DiscountServicesFigure);
                                            }} className={"mt-2 w-1/6"}
                                                onChange={(e) => e.preventDefault()}>
                                                Generate Summary
                                            </Button>

                                            {/* Discount on Labor Charges */}
                                            <Input onChange={(e) => {
                                                setDiscountServices(parseInt(e.target.value));
                                                setValue('DiscountServices', parseInt(e.target.value));
                                            }}
                                                className={"mt-2 flex w-1/6 ml-auto"} type="number" placeholder={"Discount Services %"} defaultValue={DiscountServices}/>

                                        </div>
                                        <Input onChange={(e) => {
                                            setDiscountServicesFigure(parseInt(e.target.value));
                                            setValue('DiscountServicesFigure', parseInt(e.target.value));
                                        }}
                                            className={"mt-2 flex w-3/12 ml-auto"} type="number" placeholder={"Discount Services (Figure)"} defaultValue={DiscountServicesFigure}/>
                                    </div>

                                    {/* Summary Table */}
                                    {
                                        isGenerateSummary &&
                                        (
                                            <TableSummaries data={data} />
                                        )
                                    }

                                    {/* Submit and Preview */}
                                    <div className={"flex flex-row mt-2 gap-2"}>
                                        <Button disabled={isLoading || !isGenerateSummary} className="flex gap-1">
                                            Submit

                                            <Loader isLoading={isLoading} />
                                        </Button>
                                        <Button onClick={() => setIsPrinting(true)} variant={"outline"} type={"button"}>
                                            Preview
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Footer />
                    </div>
                )
            }
            {
                isPrinting &&
                <div>
                    <PrintEstimate data={data} />
                    <div className="flex flex-row mt-2 justify-center gap-2 print:hidden">
                        <Button className="print:hidden" type="button" onClick={() => setIsPrinting(false)}>Close</Button>
                        <Button className="print:hidden" type="button" onClick={() => {
                            setIsPrinting(false);
                            window.print();
                        }}>Print</Button>
                    </div>
                </div>
            }

        </>
    )
}