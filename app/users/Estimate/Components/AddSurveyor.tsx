import Loader from "@/app/components/ui/loader";
import PlusIcon from "@/app/components/ui/plusicon";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

interface AddSurveyorProps {
    setValueSurveyor: any;
    isAddSurveyorLoading: boolean;
}

const AddSurveyor: React.FC<AddSurveyorProps> = ({ setValueSurveyor, isAddSurveyorLoading }: AddSurveyorProps) => {
    return (
        <>
            <Drawer>
                <DrawerTrigger>
                    <PlusIcon />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex items-center flex-col gap-2">
                        <DrawerTitle className="justify-center flex">Add Surveyor?</DrawerTitle>
                        <DrawerDescription className="justify-center flex gap-2">
                            <Input required form="form2" placeholder="Surveyor Name" onChange={(e) => setValueSurveyor('cSurveyor', e.target.value)} />
                            <Input required form="form2" placeholder="Surveyor NTN" onChange={(e) => setValueSurveyor('cSurveyorNTN', e.target.value)} />
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="flex justify-center items-center">
                        <Button className="w-20 flex flex-row gap-1" type="submit" form="form2">
                            Add
                            <Loader isLoading={isAddSurveyorLoading} />
                        </Button>
                        <DrawerClose>
                            <Button type="button" className="w-20" variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AddSurveyor;