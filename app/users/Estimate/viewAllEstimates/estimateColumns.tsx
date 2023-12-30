'use client'

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
} from "@/components/ui/drawer"
import { EstimateForm } from "../newEstimate/page";


export const columns: ColumnDef<EstimateForm>[] = [
    {
        accessorKey: 'id',
        header: 'EST #'
    },
    {
        accessorKey: 'jobId',
        header: 'JOB #'
    },
    {
        accessorKey: 'cName',
        header: 'Customer Name'
    },
    {
        accessorKey: 'PaymentMode',
        header: 'Payment'
    },
    {
        accessorKey: 'cRegistration',
        header: 'VEH REG NO'
    },
    {
        accessorKey: 'cMake',
        header: 'MAKE'
    },
    {
        accessorKey: 'cModel',
        header: 'MODEL'
    },
    {
        accessorKey: 'cKiloMeters',
        header: 'KM'
    },
    {
        accessorKey: 'TotalEstimateFee',
        header: 'Cost'
    },
    {
        accessorKey: 'DiscountEstimate',
        header: 'Cost Discount'
    },
    {
        accessorKey: 'TotalServiceFee',
        header: 'Service Cost'
    },
    {
        accessorKey: 'DiscountServices',
        header: 'Service Discount'
    },
    {
        accessorKey: 'OverAllAmount',
        header: 'Overall Amount'
    },
    {
        accessorKey: 'CreatedAt',
        header: 'Date'
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const estimate = row.original
            const [printing, setIsPrinting] = useState(false);


            return (
                <>
                    {
                        !printing &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(estimate.id.toString())}
                                >
                                    Copy Serial Number
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {/* <Link href={{
                                    pathname: '/users/jobCards/editJob',
                                    query: {
                                        SerialNo: `${estimate.SerialNo}`,
                                        EstimateNumber: `${estimate.EstimateNumber}`,
                                        CustomerName: `${estimate.CustomerName}`,
                                        CustomerContact: `${estimate.CellNo}`,
                                        JobCheckedBy: `${estimate.JobCheckedBy}`,
                                        WorkType: `${estimate.WorkType}`,
                                        Insurance: `${estimate.Insurance}`,
                                        RegistrationNumber: `${estimate.carRegistration}`,
                                        RequiredWorkDetails: `${estimate.RequiredWorkDetails}`,
                                        AdditionalWorkDetails: `${estimate.AdditionalWorkDetails}`,
                                        OtherAdditionalWorkDetails: `${estimate.OtherAdditionalWorkDetails}`,
                                        BatteryNumber: `${estimate.BatteryNumber}`,
                                        FrameNumber: `${estimate.FrameNo}`,
                                        DriverUser: `${estimate.DriverUser}`,
                                        Fuel: `${estimate.Fuel}`,
                                        Mileage: `${estimate.Mileage}`,
                                        Lighter: `${estimate.Lighter}`,
                                        Ashtray: `${estimate.Ashtray}`,
                                        FloorMats: `${estimate.FloorMats}`,
                                        OriginalBook: `${estimate.OriginalBook}`,
                                        SeatCovers: `${estimate.SeatCovers}`,
                                        RadioAnteena: `${estimate.RadioAnteena}`,
                                        SpareWheel: `${estimate.SpareWheel}`,
                                        WheelRod: `${estimate.WheelRod}`,
                                        JackHandle: `${estimate.JackHandle}`,
                                        Tools: `${estimate.Tools}`,
                                        ExtraThings: `${estimate.ExtraThings}`,
                                        InReceivedBy: `${estimate.InReceivedBy}`,
                                        InReceivedFrom: `${estimate.InReceivedFrom}`,
                                        InTime: `${estimate.InTime}`,
                                        OutReceivedBy: `${estimate.OutReceivedBy}`,
                                        OutReceivedFrom: `${estimate.OutReceivedFrom}`,
                                        OutTime: `${estimate.OutTime}`,
                                    },
                                }}> */}
                                    <DropdownMenuItem>Edit Estimate</DropdownMenuItem>
                                {/* </Link> */}
                                <DropdownMenuItem onClick={() => {
                                    setIsPrinting(true);
                                }
                                }>Print Estimate</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    {
                        printing &&
                        <Drawer open={printing}>
                            <DrawerContent className="h-full w-full">
                                {/* Here put link to the page for editing an estimate */}
                                <DrawerClose>
                                </DrawerClose>
                            </DrawerContent>
                        </Drawer>
                    }
                </>
            )
        },
    },
]