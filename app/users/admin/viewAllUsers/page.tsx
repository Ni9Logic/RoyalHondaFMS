import getCurrentUser from "../../../actions/getCurrentUser";
import getAllUsers from "../../../actions/getAllUsers";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import ViewAllUsers from "./viewAllUsers";

export default async function page() {
    const user = await getCurrentUser();
    const getAllUser = await getAllUsers();
    if (!user?.admin)
        return <>Not allowed!</>

    if(!getAllUser)
        return null;

    return (
        <>
            <Navbar/>
            {/* @ts-ignore */}
            <ViewAllUsers user={getAllUser}/>
            <Footer/>
        </>
    );

}