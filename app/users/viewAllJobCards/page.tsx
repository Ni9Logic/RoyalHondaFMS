import AllTables from "@/app/components/ui/allTables";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function PAGE() {
    const data = { work: '', price: '' }
    return (
        <>
            <Navbar />
            <div className="h-[80vh] mr-5 ml-5 flex items-center justify-center">
                <AllTables />
            </div>
            <Footer />
        </>
    )
}