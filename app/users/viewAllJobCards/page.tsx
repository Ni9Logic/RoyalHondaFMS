import AllTables from "@/app/components/ui/allTables";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function PAGE() {
    const data = { work: '', price: '' }
    return (
        <>
            <Navbar />
            <div className="container h-[80vh] flex items-center justify-center">
                <AllTables />
            </div>
            <Footer />
        </>
    )
}