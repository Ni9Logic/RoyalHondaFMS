import Footer from "../Footer";
import Navbar from "../Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function PAGE() {
    // Get the current date
    const currentDate = new Date();

    // Extract the year, month, and day
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const day = currentDate.getDate();

    // Format the date as a string (e.g., "2023-12-23")
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return (
        <>
            <Navbar />
            <div className="h-[80vh] w-full container flex flex-col gap-2">
                <div className="flex justify-center w-full">
                    <h1 className="text-3xl font-bold">Estimate Sheet</h1>
                </div>
                <form className="flex flex-col items-center justify-center gap-2 mt-10">
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Customer Name</Label>
                            <Input type="text" id="text" placeholder="Customer Name" />
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Estimate Number</Label>
                            <Input type="text" id="text" placeholder="Estimate Number" disabled />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Date</Label>
                            <Input type="text" id="text" placeholder="Date" value={formattedDate} disabled />
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">NTN</Label>
                            <Input type="text" id="text" placeholder="NTN" value={"3268859-8"} disabled />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Make</Label>
                            <Input type="text" id="text" placeholder="Make" />
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Model</Label>
                            <Input type="text" id="text" placeholder="Model" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Vehicle Reg No</Label>
                            <Input type="text" id="text" placeholder="Vehicle Reg No" />
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Job Card Id</Label>
                            <Input type="text" id="text" placeholder="Job Card ID (If Exist)" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-2">
                        <div className="w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">KiloMeters</Label>
                            <Input type="text" id="text" placeholder="Km" />
                        </div>
                        <div className="max-w-sm items-center gap-1.5 w-full">
                            <Select>
                                <Label>Payment Mode</Label>
                                <SelectTrigger>
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Cheque</SelectItem>
                                    <SelectItem value="dark">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    TABLE HERE
                </form >
            </div >
            <Footer />
        </>
    )
}