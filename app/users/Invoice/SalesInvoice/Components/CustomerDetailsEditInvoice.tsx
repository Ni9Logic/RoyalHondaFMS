'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { EstimateRowObject, EstimateRowType, InsuranceCompaniesData, Invoice, Surveyor } from "@/types"
import axios, { AxiosResponse } from "axios"
import { v4 as uuidv4 } from "uuid";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loader from "@/app/components/ui/loader"
import toast from "react-hot-toast"


interface DialogEditInvoiceProps {
    invoice: Invoice
}

export const DialogEditInvoice: React.FC<DialogEditInvoiceProps> = ({ invoice }: DialogEditInvoiceProps) => {
    const [open, setOpen] = React.useState(false);
    const [allSurveyors, setAllSurveyors] = React.useState<Surveyor[]>();
    const [allInsurances, setAllInsurances] = React.useState<InsuranceCompaniesData[]>();
    const [value, setValue] = React.useState("")
    const [insuranceOpen, setInsuranceOpen] = React.useState(false)
    const [Insurancevalue, setInsuranceValue] = React.useState("")
    const [Customer, setCustomer] = React.useState<InsuranceCompaniesData>();
    const [isLoading, setIsLoading] = React.useState(false);


    const fetchSureyors = async () => {
        axios.post('/api/getAllSurveyor', { method: "notStatic" })
            .then((response: AxiosResponse) => {
                const mySurveyors: Surveyor[] = response.data.Surveyors;
                setAllSurveyors(mySurveyors);
            })
            .catch((error: AxiosResponse) => console.log(error.data.Message));
    }
    const fetchInsurances = async () => {
        axios.post('/api/getAllInsurance', { method: "notStatic" })
            .then((response: AxiosResponse) => {
                const myInsurances: InsuranceCompaniesData[] = response.data.Message;
                setAllInsurances(myInsurances);
            })
            .catch((error: AxiosResponse) => console.log(error.data.Message));
    }
    React.useEffect(() => {
        const fetchData = async () => {
            await fetchInsurances();
            await fetchSureyors();
        }

        fetchData();
    }, [])
    return (
        <Dialog>
            <DialogTrigger className="ml-2 mr-2 text-sm">Edit Invoice Details</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Invoice</DialogTitle>
                    <DialogDescription>
                        {/* Invoice Details */}
                        <div className="flex flex-row gap-1">
                            <div className="flex flex-col">
                                <Label>Reg Number</Label>
                                <Input placeholder="Reg Number" onChange={(e) => {
                                    invoice.CarRegNum = e.target.value;
                                }} defaultValue={invoice.CarRegNum} />
                            </div>
                            <div className="flex flex-col">
                                <Label>Make</Label>
                                <Input placeholder="Car Make" onChange={(e) => {
                                    invoice.CarMake = e.target.value;
                                }} defaultValue={invoice.CarMake} />
                            </div>
                            <div className="flex flex-col w-full">
                                <Label>Model</Label>
                                <Input placeholder="Car Model" onChange={(e) => {
                                    invoice.CarModel = e.target.value;
                                }} defaultValue={invoice.CarModel} />
                            </div>
                        </div>
                        <div className="flex flex-row gap-1 mt-2">
                            <div className="flex flex-col">
                                <Label>Driver|User</Label>
                                <Input placeholder="Driver|User" onChange={(e) => {
                                    invoice.DriverUser = e.target.value;
                                }} defaultValue={invoice.DriverUser} />
                            </div>
                            <div className="flex flex-col">
                                <Label>Estimate #</Label>
                                <Input placeholder="Estimate #" onChange={(e) => {
                                    invoice.EstimateNum = parseInt(e.target.value);
                                }} defaultValue={invoice.EstimateNum} />
                            </div>
                            <div className="flex flex-col w-full">
                                <Label>Loss #</Label>
                                <Input placeholder="Loss #" onChange={(e) => {
                                    invoice.LossNumber = e.target.value;
                                }} defaultValue={invoice.LossNumber} />
                            </div>
                        </div>
                        <div>
                            <Label>
                                Surveyor
                            </Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {
                                            value ? value : invoice.SurveyorName
                                        }
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Customer..." className="h-9" />
                                        <CommandEmpty>No Such Surveyor</CommandEmpty>
                                        <CommandGroup>
                                            {allSurveyors?.map((surveyor: Surveyor) => (
                                                <CommandItem
                                                    key={uuidv4()}
                                                    value={surveyor.cSurveyor}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        invoice.SurveyorName = currentValue;
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {surveyor.cSurveyor}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            value === surveyor.cSurveyor ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label>
                                Insurance
                            </Label>
                            <Popover open={insuranceOpen} onOpenChange={setInsuranceOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {
                                            Insurancevalue ? Insurancevalue : invoice.InsuranceName
                                        }
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Customer..." className="h-9" />
                                        <CommandEmpty>No Such Customer</CommandEmpty>
                                        <CommandGroup>
                                            {allInsurances?.map((customer: InsuranceCompaniesData) => (
                                                <CommandItem
                                                    key={uuidv4()}
                                                    value={customer.name}
                                                    onSelect={(currentValue) => {
                                                        setInsuranceValue(currentValue === Insurancevalue ? "" : currentValue)
                                                        setCustomer(customer);
                                                        invoice.InsuranceName = customer?.name;
                                                        invoice.InsuranceNTN = customer?.NTN!;
                                                        invoice.InsuranceGSTR = customer?.GSTR;
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {customer.name}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            Insurancevalue === customer.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label>
                                Payment Mode
                            </Label>
                            <Select onValueChange={(e) => {
                                invoice.PaymentMode = e;
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder={`${invoice.PaymentMode ? invoice.PaymentMode : 'Payment Mode'}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CASH">CASH</SelectItem>
                                    <SelectItem value="CHEQUE">CHEQUE</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </DialogDescription>
                    <DialogFooter className="mt-3">
                        <Button className="flex flex-row gap-1 mt-10" disabled={isLoading} onClick={async (e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            axios.post("/api/updateInvoiceDetails", { invoice })
                                .then((response: AxiosResponse) => {
                                    toast.success(response.data.Message);
                                })
                                .catch((error: AxiosResponse) => toast.error(error.data.Message))
                                .finally(() => setIsLoading(false));
                        }}>
                            Update
                            <Loader isLoading={isLoading} />
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}