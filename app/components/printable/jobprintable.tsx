import logo from "@/app/components/images/logo.png";
import Image from "next/image";
interface PrintJobProps {
    data: any;
}

const PrintJobs: React.FC<PrintJobProps> = ({ data }: PrintJobProps) => {
    return (
        <>
            <div className="container flex flex-col">
                <div className="w-full mt-6 flex flex-row border border-black">
                    <div className="border border-black border-b-0 w-screen border-print">
                        <div className="flex flex-row gap-2 print:w-[35vw]">
                            <h1 className="print:text-3xl text-5xl text-[#221DAA] font-bold mb-0 print:mb-0 ml-2 print:ml-2">ROYAL </h1>
                            <h1 className="print:text-3xl text-5xl text-red-500 font-bold mb-0 print:mb-0 ml-2 print:ml-2">HONDA</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm print:text-[10px] mb-0 print:mb-[-2px] ml-2 print:ml-2">
                                Honda Authorised Dealer
                            </p>
                            <p className="text-sm print:text-[10px] mb-0 print:mb-[-2px] ml-2 print:ml-2">
                                CB-940-A, 445 Meherabad Peshawar Road, Rawalpindi.
                            </p>
                            <p className="text-sm print:text-[10px] mb-0 print:mb-[-2px] ml-2 print:ml-2">
                                Tel: 051-54 69 654, 54 69 653, 54 96 021, 54 69 626
                            </p>
                        </div>
                        <div className="border border-black flex flex-grow border-b-0 border-l-0 border-r-0">
                            <p className="ml-2 print:ml-2 text-sm">
                                Work Type: {data?.WorkType}
                            </p>
                        </div>
                        <div className="border border-black flex flex-grow border-b-0 border-l-0 border-r-0">
                            <p className="ml-2 print:ml-2 text-sm">
                                Registration: {data?.RegistrationNumber}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col items-center border border-black border-l-0 h-[7vh]">
                            <div className="flex flex-row gap-2">
                                <Image src={logo} width={40} height={15} alt="LOGO" />
                                <h1 className="print:text-3xl text-4xl font-bold mb-0 print:mb-0 ml-2 print:ml-2">
                                    JOB CARD
                                </h1>
                            </div>
                        </div>
                        <div className="border border-black border-t-0 border-l-0">
                            <div className="ml-2">
                                Customer Name: {data?.CustomerName}
                            </div>
                        </div>
                        <div className="border border-black border-t-0 border-l-0 ">
                            <div className="ml-2">
                                Driver/User: {data?.DriverUser}
                            </div>
                        </div>
                        <div className="border border-black border-t-0 border-l-0 ">
                            <div className="ml-2">
                                Contact No: {data?.CellNo}
                            </div>
                        </div>
                        <div className="border border-black border-t-0 border-l-0">
                            <div className="ml-2">
                                Job Checked By: {data?.JobCheckedBy}
                            </div>
                        </div>
                        <div className="border border-black border-t-0 border-l-0">
                            <div className="ml-2 text-xl text-red-500 flex flex-row gap-1">
                                Email: <p className="text-black text-sm text-center justify-center flex items-center font-bold print:mr-1 mr-1">services.royalhonda@gmail.com</p>
                            </div>
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0">
                            <div className="ml-2 print:items-center">
                                Serial No: 5
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="border border-black flex flex-grow print:h-[33vh]">
                        <div className="border border-black border-t-0 border-l-0 border-r-0">
                            <h1 className="text-sm ml-2 font-bold">S.# Required Work Details</h1>
                            {/* Implementation to fetch all the required details */}
                        </div>
                    </div>
                    <div className="border border-black border-b-0 flex-grow flex flex-col border-l-0">
                        <div className="border border-black border-t-0 print:border-t-1 bg-gray-400">
                            <h1 className="text-sm ml-2 print:mr-2 font-bold">Tools|CheckList</h1>
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Fuel: {data?.Fuel}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Mileage: {data?.Mileage}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Lighter: {data?.Lighter ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Ashtray: {data?.Ashtray ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Floor Mats: {data?.FloorMats ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Orignal Book: {data?.OriginalBook ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Seat Covers: {data?.SeatCovers ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Spare Wheel: {data?.SpareWheel ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Wheel Rod: {data?.WheelRod ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Jack/Handle: {data?.JackHandle ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Tools: {data?.Tools ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Extra Things: {data?.ExtraThings ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border border-black border-t-0 border-l-0 border-b-0 border-r-0">
                            <h1 className="text-sm ml-2">Frame No: {data?.FrameNo}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                        <div className="border flex flex-grow border-black border-t-0 border-l-0 border-r-0">
                            <h1 className="text-sm ml-2">Battery No: {data?.BatteryNumber}</h1>
                            <hr className="border-t-1 border-black" />
                        </div>
                    </div>
                </div>
                <div className="border h-[20vh] print:h-[17vh] border-black flex-grow flex border-t-0 print:border-t-1">
                    <div className="ml-2 text-sm">
                        Other Additional Work (If Required)
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="border h-[10vh] border-black w-[20vw] border-t-0 text-center text-sm">
                        User Signature
                    </div>
                    <div className="border flex flex-grow border-black w-[55vw] print:w-[68vw] border-l-0 border-t-0 items-center">
                        <p className="text-red-500">NOTE: </p>
                        <div className="text-sm ml-2 flex gap-1 items-center">
                            I have thoroughly inspected all the work mentioned above and checked all the things in my car. I am completely satisfied.
                        </div>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="border h-[7vh] border-black w-[40vw] border-t-0 text-center text-sm">
                    </div>
                    <div className="border border-black border-l-0 border-t-0 w-[15vw] flex items-center justify-center">
                        <h1 className="text-center font-bold text-2xl items-center flex justify-center self-center h-[7vh]">
                            IN
                        </h1>
                    </div>
                    <div className="border h-[7vh] border-black border-t-0 border-l-0 w-[10vw]">
                    </div>
                    <div className="border flex flex-grow h-[7vh] border-black border-t-0 border-l-0 w-[10vw] print:w-[20vw] text-center justify-center">
                        <div className="border border-black border-t-0 border-l-0 border-b-0 w-full">
                            Date
                        </div>
                        <hr className="border-t-1 border-black" />
                        <div className="border border-black border-t-0 border-l-0 border-r-0 border-b-0 w-full">
                            Time
                        </div>

                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="border h-[7vh] border-black w-[40vw] border-t-0 text-center text-sm">
                    </div>
                    <div className="border h-[7vh] border-black border-l-0 border-t-0 w-[15vw] flex items-center justify-center">
                        <h1 className="text-center font-bold text-2xl items-center flex justify-center self-center">
                            OUT
                        </h1>
                    </div>
                    <div className="border h-[7vh] border-black border-t-0 border-l-0 w-[10vw]">
                    </div>
                    <div className="border h-[7vh] border-black border-t-0 border-l-0 w-[10vw] print:w-[20vw] text-center flex flex-grow justify-center">
                        <div className="border border-black border-t-0 border-l-0 border-b-0 w-full">
                            Date
                        </div>
                        <hr className="border-t-1 border-black" />
                        <div className="border border-black border-t-0 border-l-0 border-r-0 border-b-0 w-full">
                            Time
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintJobs;
