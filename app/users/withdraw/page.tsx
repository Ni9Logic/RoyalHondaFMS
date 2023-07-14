import React from "react";
import Navbar from "../Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Withdraw from "./Withdraws";
import Footer from "../Footer";


export default async function page() {
    const user = await getCurrentUser();
    return (
        <div>
            <Navbar />
            <Withdraw currentUser={user}/>
            <Footer />
        </div>
    );
}
