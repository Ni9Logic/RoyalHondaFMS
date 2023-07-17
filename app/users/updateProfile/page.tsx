// @ts-ignore
import React from "react";
import Navbar from "../Navbar";
import getCurrentUser from "../../actions/getCurrentUser";
import Footer from "../Footer";
import Updates from "@/app/users/updateProfile/Updates";


export default async function page() {
    const user = await getCurrentUser();

    if (!user) return null;
    return (
        <div>
            <Navbar/>
            <Updates currentUser={user}/>
            <Footer/>
        </div>
    );
}
