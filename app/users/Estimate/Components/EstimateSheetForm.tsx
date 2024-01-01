import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Surveyor } from "../../Interfaces/Interface";

interface EstimateSheetFormProps {
    estId: string;
    setValue: any;
    setcName: any;
    cName: string;
    register: any;
    formattedDate: string;
    isRoyal: boolean;
    setcMake: any;
    cMake: string;
    setcModel: any;
    cModel: string;
    setcRegistration: any;
    cRegistration: string;
    setjobId: any;
    jobId: number;
    setcDriverUser: any;
    cDriverUser: string;
    setcKiloMeters: any;
    ckiloMeters: number;
}


const EstimateSheetForm: React.FC<EstimateSheetFormProps> = ({
    estId,
    cDriverUser,
    cMake,
    cModel,
    cName,
    cRegistration,
    ckiloMeters,
    formattedDate,
    isRoyal,
    jobId,
    register,
    setcDriverUser,
    setcMake,
    setcModel,
    setcName,
    setcRegistration,
    setcKiloMeters,
    setjobId,
    setValue,
}: EstimateSheetFormProps) => {
    return (
        <>
            <div className="flex flex-row gap-2">
                <div className="max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Customer Name</Label>
                    <div className="flex flex-row w-full">
                        <div className="">
                            <Input onChange={(e) => {
                                setValue('cName', e.target.value);
                                setcName(e.target.value);
                            }} defaultValue={cName} type="text" id="text" placeholder="Customer Name"
                                required />
                        </div>
                    </div>
                </div>
                <div className="flex-grow max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Estimate Number</Label>
                    <Input value={estId ? estId + 1 : '1'} type="text" id="text" placeholder="Estimate Number" disabled />
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className="flex-grow max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Date</Label>
                    <Input {...register('CreatedAt')} type="text" id="text" placeholder="Date"
                        value={formattedDate} disabled />
                </div>
                <div className="flex-grow max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">NTN</Label>
                    <Input type="text" id="text" placeholder="NTN" value={isRoyal ? "7522464-3" : "3268859-8"} disabled />
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className="flex-grow max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Make</Label>
                    <Input onChange={(e) => {
                        setValue('cMake', e.target.value);
                        setcMake(e.target.value);
                    }} defaultValue={cMake} type="text" id="text" placeholder="Make" required />
                </div>
                <div className="flex-grow max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Model</Label>
                    <Input onChange={(e) => {
                        setValue('cModel', e.target.value);
                        setcModel(e.target.value);
                    }} defaultValue={cModel} type="text" id="text" placeholder="Model" required />
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className="flex-grow max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Vehicle Reg No</Label>
                    <Input onChange={(e) => {
                        setValue('cRegistration', e.target.value);
                        setcRegistration(e.target.value);
                    }} defaultValue={cRegistration} type="text" id="text" placeholder="Vehicle Reg No"
                        required />
                </div>
                <div className="flex-grow max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Job Card Id</Label>
                    <Input onChange={(e) => {
                        setValue('jobId', e.target.value);
                        setjobId(e.target.value);
                    }} defaultValue={jobId} type="number" id="text" placeholder="Job Card ID (If Exist)" />
                </div>
            </div>
            <div className="flex flex-row gap-2 mt-2">
                <div className="w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">Driver|User</Label>
                    <Input onChange={(e) => {
                        setValue('cDriverUser', e.target.value);
                        setcDriverUser(e.target.value);
                    }} defaultValue={cDriverUser} type="text" placeholder="Driver/User" required />
                </div>
                <div className="w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Customer Name">KiloMeters</Label>
                    <Input onChange={(e) => {
                        setValue('cKiloMeters', parseInt(e.target.value));
                        setcKiloMeters(parseInt(e.target.value));
                    }} defaultValue={ckiloMeters} type="number" id="number" placeholder="Km" required />
                </div>
            </div>
            
        </>
    )
}

export default EstimateSheetForm;