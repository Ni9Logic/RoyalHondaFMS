"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { InsuranceCompaniesData, Invoice, Surveyor } from "@/types"
import axios, { AxiosError, AxiosResponse } from "axios"
import { v4 as uuidv4 } from "uuid";
import { InvoiceData } from "@/app/lib/Resources"
import { UseFormSetValue } from "react-hook-form"


interface SelectCustomerProps {
    setSurveyor: (surveyor: Surveyor) => void,
    setValueForm: UseFormSetValue<Invoice>,
}
export const SelectSurveyor: React.FC<SelectCustomerProps> = ({ setSurveyor: setInsurance, setValueForm }: SelectCustomerProps) => {
    const [allSurveyors, setAllSurveyors] = React.useState<Surveyor[]>();

    const fetchInsurances = async () => {
        axios.post('/api/getAllSurveyor', { method: "notStatic" })
            .then((response: AxiosResponse) => {
                const mySurveyors: Surveyor[] = response.data.Surveyors;
                setAllSurveyors(mySurveyors);
            })
            .catch((error: AxiosResponse) => console.log(error.data.Message));
    }
    React.useEffect(() => {
        const fetchData = async () => {
            await fetchInsurances();
        }

        fetchData();
    }, [])

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [Surveyor, setSurveyors] = React.useState<Surveyor>();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {
                        Surveyor?.cSurveyor || InvoiceData?.SurveyorName ?
                        Surveyor?.cSurveyor ? Surveyor?.cSurveyor : InvoiceData?.SurveyorName
                        : "Select Customer"
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

                                    // Insurance is basically setSurveyor
                                    setInsurance(surveyor);

                                    setSurveyors(surveyor);
                                    setValueForm("SurveyorName", surveyor.cSurveyor);
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
    )
}

export default SelectSurveyor;