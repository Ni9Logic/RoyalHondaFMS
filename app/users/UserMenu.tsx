import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import Loader from '../components/ui/loader';

export default function UserMenu() {
    const [isJobCardLoading, setIsJobCardLoading] = useState(false);
    const [isEstimateLoading, setIsEstimateLoading] = useState(false);
    const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
    const [isLedgerLoading, setIsLedgerLoading] = useState(false);
    const router = useRouter();
    return (
        <section className="flex flex-col text-gray-600 body-font h-[75vh] justify-center items-center">
            <div className="gap-2 flex flex-col pt-5 w-60">
                <Button className='flex gap-1' disabled={isJobCardLoading} onClick={() => {
                    setIsJobCardLoading(true);
                    router.push('/users/jobCards');
                }}>
                    Job Card
                    <Loader isLoading={isJobCardLoading} />
                </Button>
                <Button className='flex gap-1' disabled={isEstimateLoading} onClick={() => {
                    setIsEstimateLoading(true);
                    router.push('/users/Estimate');
                }}>
                    Estimates
                    <Loader isLoading={isEstimateLoading} />
                </Button>
                <Button className='flex gap-1' disabled={isInvoiceLoading} onClick={() => {
                    setIsInvoiceLoading(true);
                    router.push('/users/Estimate/newEstimate');
                }}>
                    Invoices
                    <Loader isLoading={isInvoiceLoading} />
                </Button>
                <Button className='flex gap-1' disabled={isLedgerLoading} onClick={() => {
                    setIsLedgerLoading(true);
                    router.push('/users/Estimate/newEstimate');
                }}>
                    Ledgers
                    <Loader isLoading={isLedgerLoading} />
                </Button>
            </div>
        </section >
    )
}
