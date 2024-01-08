import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import Loader from '../components/ui/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function UserMenu() {
    const [isAllJobCardLoading, setisAllJobCardLoading] = useState(false);
    const [isCreateJobCardLoading, setisCreateJobCardLoading] = useState(false);
    const [isCreateEstimateLoading, setCreateEstimateLoading] = useState(false);
    const [isViewAllEstimatesLoading, setisViewAllEstimatesLoading] = useState(false);
    const [isSalesInvoicesLoading, setisSalesInvoicesLoading] = useState(false);
    const [IsShowAllInvoices, setIsShowAllInvoices] = useState(false);
    const [isShowAllSheets, setIsShowAllSheets] = useState(false);
    const router = useRouter();
    return (
        <section className="flex flex-col text-gray-600 body-font h-[75vh] justify-center items-center">
            <div className="gap-2 pt-5">
                {/* Tabs */}
                <Tabs defaultValue="Jobcard" className="w-full">
                    <TabsList>
                        <TabsTrigger value="Jobcard">Jobcard</TabsTrigger>
                        <TabsTrigger value="Estimate">Estimate</TabsTrigger>
                        <TabsTrigger value="Invoice">Invoice</TabsTrigger>
                        <TabsTrigger value="Ledger">Ledger</TabsTrigger>
                        <TabsTrigger value="Summary Sheet">Summary Sheet</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Jobcard" className='w-full flex items-center justify-center gap-2'>
                        <Button disabled={isCreateJobCardLoading} onClick={() => {
                            setisCreateJobCardLoading(true);
                            router.push('/users/jobCards/createJobCard');
                        }} className="flex gap-1">
                            Create Job Card
                            <Loader isLoading={isCreateJobCardLoading} />
                        </Button>
                        <Button disabled={isAllJobCardLoading} onClick={async () => {
                            setisAllJobCardLoading(true);
                            router.push('/users/jobCards/viewAllJobCards')
                        }} className="flex gap-1">
                            All Job Cards
                            <Loader isLoading={isAllJobCardLoading} />
                        </Button>
                    </TabsContent>
                    <TabsContent value="Estimate" className='w-full flex items-center justify-center gap-2 m-0'>
                        <Button disabled={isCreateEstimateLoading} className="flex gap-1" onClick={() => {
                            setCreateEstimateLoading(true);
                            router.push('/users/Estimate/newEstimate');
                        }}>
                            Create Estimate
                            <Loader isLoading={isCreateEstimateLoading} />
                        </Button>
                        <Button disabled={isViewAllEstimatesLoading} className="flex flex-row gap-1" onClick={() => {
                            setisViewAllEstimatesLoading(true);
                            router.push('/users/Estimate/viewAllEstimates');
                        }}>
                            View All Estimates
                            <Loader isLoading={isViewAllEstimatesLoading} />
                        </Button>
                    </TabsContent>
                    <TabsContent value="Invoice" className='w-full flex items-center justify-center flex-row gap-1'>
                        <Button onClick={() => {
                            setisSalesInvoicesLoading(true);
                            router.push('/users/Invoice/SalesInvoice/newSalesInvoice');
                        }} className='flex flex-row gap-1' disabled={isSalesInvoicesLoading}>
                            Sales Invoice
                            <Loader isLoading={isSalesInvoicesLoading} />
                        </Button>
                        <Button onClick={() => {
                            setIsShowAllInvoices(true);
                            router.push('/users/Invoice/SalesInvoice/viewAllSalesInvoice');
                        }} className='flex flex-row gap-1' disabled={IsShowAllInvoices}>
                            View All Invoices
                            <Loader isLoading={IsShowAllInvoices} />
                        </Button>
                    </TabsContent>
                    <TabsContent value="Ledger" className='w-full flex items-center justify-center'>
                        <Button variant={'secondary'}>
                            In Progress
                        </Button>
                    </TabsContent>
                    <TabsContent value="Summary Sheet" className='w-full flex items-center justify-center'>
                        <Button className='flex flex-row gap-1' disabled={isShowAllSheets} onClick={() => {
                            setIsShowAllSheets(true);
                            router.push('/users/summarySheet/viewAllSheets');
                        }}>
                            Summary Sheet
                            <Loader isLoading={isShowAllSheets} />
                        </Button>
                    </TabsContent>
                </Tabs>
            </div>
        </section >
    )
}
