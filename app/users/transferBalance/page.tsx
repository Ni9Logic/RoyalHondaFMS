import getCurrentUser from "@/app/actions/getCurrentUser";
import Navbar from "@/app/users/Navbar";
import Transfers from "@/app/users/transferBalance/Transfers";
import Footer from "@/app/users/Footer";

export default async function page() {
    const user = await getCurrentUser();
    if (!user)
        return null;

    return (
        <>
            <Navbar/>
            <Transfers currentUser={user}/>
            <Footer/>
        </>
    );
}