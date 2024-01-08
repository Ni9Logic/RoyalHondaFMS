import { Label } from "@/components/ui/label";
import { EstimateForm } from "@/types";

const TableSummaries: React.FC<{ data: EstimateForm }> = ({ data }) => {
    function handleEstimateTotalPrice(EstimateArray: any) {
        let totalPrice = 0;
        Object.keys(EstimateArray).map((key, index) => (
            totalPrice = totalPrice + EstimateArray[key].partTotalPrice
        ))

        return totalPrice;
    }

    function handleServicesTotalPrice(EstimateArray: any) {
        let totalPrice = 0;
        Object.keys(EstimateArray).map((key, index) => (
            totalPrice = totalPrice + EstimateArray[key].charges
        ))

        return totalPrice;
    }

    function handleDiscountEstimate(totalEstimatePrice: number) {
        if (isNaN(data.DiscountEstimate))
            data.DiscountEstimate = 0;

        return (data?.DiscountEstimate / 100) * totalEstimatePrice;
    }

    function handleDiscountServices(totalServicesPrice: number) {
        if (isNaN(data.DiscountServices))
            data.DiscountServices = 0;

        return (data?.DiscountServices / 100) * totalServicesPrice;
    }

    function overAllBillEstimate(totalEstimatePrice: number) {
        return totalEstimatePrice - handleDiscountEstimate(totalEstimatePrice);
    }

    function overAllBillServices(totalServicesPrice: number) {
        return totalServicesPrice - handleDiscountServices(totalServicesPrice);
    }

    function handleOverAllBill() {
        return overAllBillEstimate(handleEstimateTotalPrice(data.EstimateTableData)) + overAllBillServices(handleServicesTotalPrice(data.ServicesDetailsTableData));
    }

    function handleBillWithFigureDiscounts() {
        if (isNaN(data?.DiscountEstimateFigure))
            data.DiscountEstimateFigure = 0;

        if (isNaN(data?.DiscountServicesFigure))
            data.DiscountServicesFigure = 0;


        return handleOverAllBill() - data?.DiscountEstimateFigure - data?.DiscountServicesFigure;
    }


    return (
        <>
            <div className={"flex flex-col"}>
                <div className={"mt-10 flex w-full justify-center flex-col"}>
                    <Label className={"w-full items-center flex justify-center mb-2"}>Estimate
                        Summary</Label>
                    <table
                        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                    Total Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(data?.EstimateTableData).map((key, index) => (
                                    <tr key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {data?.EstimateTableData[key].partNo}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data?.EstimateTableData[key].partDesc}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {data?.EstimateTableData[key].partPrice.toLocaleString()} Rs
                                        </td>
                                        <td className="px-6 py-4">
                                            {data?.EstimateTableData[key].partQty}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {data?.EstimateTableData[key].partTotalPrice.toLocaleString()} Rs
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className={"mt-2 flex justify-end flex-col gap-2"}>
                        <Label className={"flex justify-end"}>
                            Parts
                            Total: {handleEstimateTotalPrice(data?.EstimateTableData).toLocaleString()} Rs
                        </Label>
                        {
                            data?.DiscountEstimate !== 0 && !isNaN(data?.DiscountEstimate) &&
                            <Label className={"flex justify-end"}>
                                Discount: {handleDiscountEstimate(handleEstimateTotalPrice(data?.EstimateTableData)).toLocaleString()} Rs
                            </Label>
                        }
                    </div>
                </div>
                <div>
                    <Label className={"w-full items-center flex justify-center mb-2"}>Services
                        Summary</Label>
                    <table
                        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(data?.ServicesDetailsTableData).map((key, index) => (
                                    <tr key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {data?.ServicesDetailsTableData[key].details}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data?.ServicesDetailsTableData[key].charges.toLocaleString()} Rs
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className={"mt-2 flex justify-end flex-col gap-2"}>
                        <Label className={"mt-2 flex justify-end"}>
                            Services
                            Total: {handleServicesTotalPrice(data?.ServicesDetailsTableData).toLocaleString()} Rs
                        </Label>
                        {data?.DiscountServices !== 0 && !isNaN(data?.DiscountServices) &&
                            <Label className={"mt-2 flex justify-end"}>
                                Discount: {handleDiscountServices(handleServicesTotalPrice(data?.ServicesDetailsTableData)).toLocaleString()} Rs
                            </Label>
                        }
                    </div>

                    <div className={"mt-16 flex justify-center items-end flex-col gap-2 h-auto"}>
                        <div className={"relative w-auto h-auto"}>
                            <hr className={"border-t-1 border-black flex w-auto h-auto"} />
                            <Label className={"mt-2 flex justify-center mb-2 font-bold"}>
                                Overall Summary
                            </Label>
                            <hr className={"border-t-1 border-black flex"} />
                            <div className={"relative mt-2 flex flex-col gap-1"}>
                                <Label className={"flex flex-row gap-1"}>
                                    <p className={"font-bold"}>Cost of Parts:</p>{" "}
                                    {handleEstimateTotalPrice(data?.EstimateTableData).toLocaleString()} Rs
                                </Label>
                                {data?.DiscountEstimate !== 0 && !isNaN(data?.DiscountEstimate) && (
                                    <Label className={"flex flex-row gap-1"}>
                                        <p className={"font-bold"}>{data?.DiscountEstimate} % Discount on
                                            Parts:</p>{" "}
                                        {handleDiscountEstimate(
                                            handleEstimateTotalPrice(data?.EstimateTableData)
                                        ).toLocaleString()}{" "}
                                        Rs
                                    </Label>
                                )}
                                <Label className={"flex flex-row gap-1"}>
                                    <p className={"font-bold"}>Services / Labor Cost: </p>
                                    {handleServicesTotalPrice(data?.ServicesDetailsTableData).toLocaleString()} Rs
                                </Label>
                                {
                                    data?.DiscountServices !== 0 && !isNaN(data?.DiscountServices) && (
                                        <Label className={"flex flex-row gap-1"}>
                                            <p className={"font-bold"}>{data?.DiscountServices} % Discount on
                                                Services:</p>{" "}
                                            {handleDiscountServices(
                                                handleServicesTotalPrice(data?.ServicesDetailsTableData)
                                            ).toLocaleString()} Rs
                                        </Label>
                                    )
                                }

                                <hr className={"border-t-1 border-black flex w-auto h-auto mt-3"} />
                                <Label className={"mt-1 flex justify-center mb-1 font-bold"}>
                                    Overall Amount
                                </Label>
                                <hr className={"border-t-1 border-black flex"} />
                                <Label className={"flex flex-row gap-1"}>
                                    Parts Price{
                                        data?.DiscountEstimate !== 0 && !isNaN(data?.DiscountEstimate) ? (
                                            <p className={"font-bold"}>
                                                (Discount): {overAllBillEstimate(handleEstimateTotalPrice(data?.EstimateTableData)).toLocaleString()} Rs
                                            </p>
                                        ) : (
                                            <p>
                                                <p>: {handleEstimateTotalPrice(data?.EstimateTableData).toLocaleString()} Rs</p>
                                            </p>
                                        )
                                    }
                                </Label>
                                <Label className={"flex flex-row gap-1"}>
                                    Services Price{
                                        data?.DiscountServices !== 0 && !isNaN(data?.DiscountServices) ? (
                                            <p className={"font-bold"}>
                                                (Discount): {overAllBillServices(handleServicesTotalPrice(data?.ServicesDetailsTableData)).toLocaleString()} Rs
                                            </p>
                                        ) : (
                                            <p>
                                                <p>: {handleServicesTotalPrice(data?.ServicesDetailsTableData).toLocaleString()} Rs</p>
                                            </p>
                                        )
                                    }
                                </Label>
                                <Label className="flex flex-row gap-1">
                                    {
                                        data?.DiscountEstimateFigure !== 0 && !isNaN(data?.DiscountEstimateFigure) &&
                                        <p className="flex flex-row gap-1">Parts <p className="font-bold">(Discount)</p>: -{data?.DiscountEstimateFigure.toLocaleString()} Rs</p>
                                    }
                                </Label>
                                <Label className="flex flex-row gap-1">
                                    {
                                        data?.DiscountServicesFigure !== 0 && !isNaN(data?.DiscountServicesFigure) &&
                                        <p className="flex flex-row gap-1">Service / Labor <p className="font-bold">(Discount)</p>: -{data?.DiscountServicesFigure.toLocaleString()} Rs</p>
                                    }
                                </Label>
                                <Label className={"flex flex-row gap-1"}>
                                    Total Amount: <p
                                        className={"font-bold"}>{handleBillWithFigureDiscounts().toLocaleString()} Rs</p>
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableSummaries;