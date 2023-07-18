import getUserTransactions from "@/app/actions/getUserTransactions";
import Navbar from "@/app/users/Navbar";
import Footer from "@/app/users/Footer";
import Transactions from "@/app/users/transactions/Transactions";

export default async function page() {
    const transactions = await getUserTransactions;

    if (!transactions)
        return null;
    return (
        <>
            <Navbar/>
            {/* @ts-ignore */}
            <Transactions transactions={transactions}/>
            <Footer/>
        </>
    );
}