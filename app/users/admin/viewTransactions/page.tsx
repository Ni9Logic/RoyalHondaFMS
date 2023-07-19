import getAllTransactions from "@/app/actions/getAllTransactions";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import ViewTransactions from "./viewTransactions";


export default async function page(){
    const allTransactions = await getAllTransactions();

    if (!allTransactions)
        return <>Loading...</>

    return (
        <>
        <Navbar />
        <ViewTransactions transactions={allTransactions} />
        <Footer />
        </>
    );
}