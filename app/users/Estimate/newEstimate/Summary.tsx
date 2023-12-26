import { Label } from "@/components/ui/label";
import { EstimateForm } from "./page";

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

    function handleEstimateDiscount(totalEstimatePrice: number) {
        if (isNaN(data.EstimateDiscount))
            data.EstimateDiscount = 0;

        return (data?.EstimateDiscount / 100) * totalEstimatePrice;
    }

    function handleServicesDiscount(totalServicesPrice: number) {
        if (isNaN(data.ServicesDiscount))
            data.ServicesDiscount = 0;

        return (data?.ServicesDiscount / 100) * totalServicesPrice;
    }

    function overAllBillEstimate(totalEstimatePrice: number) {
        return totalEstimatePrice - handleEstimateDiscount(totalEstimatePrice);
    }

    function overAllBillServices(totalServicesPrice: number) {
        return totalServicesPrice - handleServicesDiscount(totalServicesPrice);
    }

    function handleOverAllBill() {
        return overAllBillEstimate(handleEstimateTotalPrice(data.EstimateTableData)) + overAllBillServices(handleServicesTotalPrice(data.ServicesDetailsTableData));
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
                            data?.EstimateDiscount !== 0 && !isNaN(data?.EstimateDiscount) &&
                            <Label className={"flex justify-end"}>
                                Discount: {handleEstimateDiscount(handleEstimateTotalPrice(data?.EstimateTableData)).toLocaleString()} Rs
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
                        {data?.ServicesDiscount !== 0 && !isNaN(data?.ServicesDiscount) &&
                            <Label className={"mt-2 flex justify-end"}>
                                Discount: {handleServicesDiscount(handleServicesTotalPrice(data?.ServicesDetailsTableData)).toLocaleString()} Rs
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
                                {data?.EstimateDiscount !== 0 && !isNaN(data?.EstimateDiscount) && (
                                    <Label className={"flex flex-row gap-1"}>
                                        <p className={"font-bold"}>{data?.EstimateDiscount} % Discount on
                                            Parts:</p>{" "}
                                        {handleEstimateDiscount(
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
                                    data?.ServicesDiscount !== 0 && !isNaN(data?.ServicesDiscount) && (
                                        <Label className={"flex flex-row gap-1"}>
                                            <p className={"font-bold"}>{data?.ServicesDiscount} % Discount on
                                                Services:</p>{" "}
                                            {handleServicesDiscount(
                                                handleServicesTotalPrice(data?.ServicesDetailsTableData)
                                            ).toLocaleString()} Rs
                                        </Label>
                                    )
                                }

                                <hr className={"border-t-1 border-black flex w-auto h-auto mt-3"} />
                                <Label className={"mt-1 flex justify-center mb-1 font-bold"}>
                                    Overall Bill
                                </Label>
                                <hr className={"border-t-1 border-black flex"} />
                                <Label className={"flex flex-row gap-1"}>
                                    Parts Price{
                                        data?.EstimateDiscount !== 0 && !isNaN(data?.EstimateDiscount) ? (
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
                                        data?.ServicesDiscount !== 0 && !isNaN(data?.ServicesDiscount) ? (
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

                                <Label className={"flex flex-row gap-1"}>
                                    Total Bill: <p
                                        className={"font-bold"}>{handleOverAllBill().toLocaleString()} Rs</p>
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