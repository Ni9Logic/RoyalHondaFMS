'use client'

import { ColumnDef } from "@tanstack/react-table";

type In = {
    VReceivedBy: string,
    VReceivedFrom: string,
    VReceivedTime: string,
}

type Out = {
    VReceivedBy: string,
    VReceivedFrom: string,
    VReceivedTime: string,
}

export type JobTable = {
    SerialNo: number;
    CustomerName: String;
    DriverUser: String;
    CellNo: String;
    JobCheckedBy: String;
    WorkType: String;
    Insurance: String;
    carRegistration: String;
    FrameNo: String;
    BatteryNumber: String;
    In: In[];
    Out: Out[];
}

export const columns: ColumnDef<JobTable>[] = [
    {
        accessorKey: 'SerialNo',
        header: 'Serial No'
    },
    {
        accessorKey: 'CustomerName',
        header: 'Customer Name'
    },
    {
        accessorKey: 'Insurance',
        header: 'Insurance Company'
    },
    {
        accessorKey: 'CellNo',
        header: 'Contact Number'
    },
    {
        accessorKey: 'DriverUser',
        header: 'Driver | User'
    },
    {
        accessorKey: 'JobCheckedBy',
        header: 'Job Checked By'
    },
    {
        accessorKey: 'carRegistration',
        header: 'Registration Number'
    },
    {
        accessorKey: 'DriverUser',
        header: 'Driver | User'
    },
    {
        accessorKey: 'BatteryNumber',
        header: 'Battery Number'
    },
    {
        accessorKey: 'FrameNo',
        header: 'Frame Number'
    },
]