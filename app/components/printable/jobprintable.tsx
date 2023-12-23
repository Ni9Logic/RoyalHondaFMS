import logo from "@/app/components/images/logo.png";
import Image from "next/image";
interface PrintJobProps {
    data: any;
}

const AnotherPrintJobs: React.FC<PrintJobProps> = ({ data }: PrintJobProps) => {
    return (
        <>
            <div className="container h-[99vh]">
                <div className="border border-black mt-2 flex flex-col">
                    <div className="flex flex-row">
                        <div className="w-full flex flex-col">
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
                                <hr className="border-t-1 border-black" />

                            </div>
                            <p className="ml-2 print:ml-2 text-sm">
                                Work Type: {data?.WorkType}
                            </p>
                            <hr className="border-t-1 border-black" />

                            <p className="ml-2 print:ml-2 text-sm">
                                Registration:
                                <p className="text-red-500 text-xl">
                                    {data?.RegistrationNumber}
                                </p>
                            </p>

                        </div>
                        <div className="w-full border border-black border-r-0 border-t-0 border-b-0">
                            <div className="flex flex-row items-center justify-center mb-1">
                                <Image src={logo} width={40} height={15} alt="LOGO" />
                                <h1 className="print:text-3xl text-4xl font-bold mb-0 print:mb-0 ml-2 print:ml-2">
                                    JOB CARD
                                </h1>
                            </div>
                            <hr className="border-t-1 border-black" />

                            <p className="ml-2"> Customer Name: {data?.CustomerName} </p>
                            <hr className="border-t-1 border-black" />

                            <p className="ml-2"> Driver|User: {data?.DriverUser} </p>
                            <hr className="border-t-1 border-black" />

                            <p className="ml-2"> Insurance: {data?.Insurance} </p>
                            <hr className="border-t-1 border-black" />


                            <p className="ml-2"> Contact No: {data?.CellNo} </p>
                            <hr className="border-t-1 border-black" />

                            <p className="ml-2"> Job Checked By: {data?.JobCheckedBy} </p>
                            <hr className="border-t-1 border-black" />

                            <p className="ml-2 text-sm"> Email: services.royalhonda@gmail.com </p>

                        </div>
                    </div>
                    <hr className="border-t-1 border-black" />
                    <div className="flex flex-row">
                        <p className="w-full border border-black border-t-0 border-l-0 border-b-0"><p className="font-bold text-center">S.# Required Work Details</p>
                            <hr className="border-t-1 border-black" />
                            <p className="ml-2">{data?.RequiredWorkDetails}</p>

                        </p>

                        <hr className="border-r-1 border-black" />
                        <div className="flex flex-col w-full">
                            <p className="w-full font-bold text-center">
                                Tools|Checklist
                            </p>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Fuel: {data?.Fuel}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Mileage: {data?.Mileage}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Lighter: {data?.Lighter ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Ashtray: {data?.Ashtray ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Floor Mats: {data?.FloorMats ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Orignal Book: {data?.OriginalBook ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Seat Covers: {data?.SeatCovers ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Spare Wheel: {data?.SpareWheel ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Wheel Rod: {data?.WheelRod ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Jack/Handle: {data?.JackHandle ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Tools: {data?.Tools ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Extra Things: {data?.ExtraThings ? 'Yes' : 'No'}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Frame No: {data?.FrameNo}</h1>
                            <hr className="border-t-1 border-black" />

                            <h1 className="text-sm ml-2">Battery No: {data?.BatteryNumber}</h1>
                        </div>
                    </div>
                    <hr className="border-t-1 border-black" />
                    <div className="ml-2 h-[20vh]">
                        <p className="text-sm">Other Additional Work (If Required)</p>
                        <p>{data?.AdditionalWorkDetails}</p>
                    </div>
                    <hr className="border-t-1 border-black" />
                    <div className="flex flex-row">
                        <p className="ml-2 w-full border border-black border-l-0 border-b-0 border-t-0">User Signature</p>
                        <p className="w-full ml-2 text-blue-600 text-center">
                            <p className="text-red-500">Note:</p>
                            I have personally verified the things mentioned above, and I have also checked all the belongings of my car. I am completely satisfied.
                        </p>
                    </div>
                    <hr className="border-t-1 border-black" />
                    <div className="flex flex-row">
                        <div className="w-full border border-black border-l-0 border-t-0 border-b-0">
                            {data?.InReceivedBy}
                        </div>
                        <h1 className="w-full  flex flex-row">
                            <p className="ml-2 mr-2 text-xl font-bold">IN</p>
                            {data?.InReceivedFrom}
                        </h1>

                        <div className="w-full border border-b-0 border-t-0 border-r-0 border-black">
                            <p className="ml-2">Date Time</p>
                            {data?.InReceivedTime}
                        </div>
                    </div>

                    <hr className="border-t-1 border-black" />
                    <div className="flex flex-row">
                        <div className="w-full border border-black border-l-0 border-t-0 border-b-0">
                            {data?.OutReceivedBy}
                        </div>
                        <h1 className="w-full  flex flex-row">
                            <p className="ml-2 mr-2 text-xl font-bold">IN</p>
                            {data?.OutReceivedFrom}
                        </h1>

                        <div className="w-full border border-b-0 border-t-0 border-r-0 border-black">
                            <p className="ml-2">Date Time</p>
                            {data?.OutReceivedTime}
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center print:hidden mt-2">
                    <button onClick={() => {
                        window.print();
                    }} type="button" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Print</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AnotherPrintJobs;
