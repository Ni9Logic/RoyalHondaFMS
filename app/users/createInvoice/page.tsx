import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="h-[79vh] flex flex-col items-center justify-center">
                All the data here
            </div>
            <Footer />
        </>
    )
}