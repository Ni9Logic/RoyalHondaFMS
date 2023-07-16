// @ts-ignore
import React from "react";
import Navbar from "../Navbar";
import getCurrentUser from "../../actions/getCurrentUser";
import Deposits from "./Deposits";
import Footer from "../Footer";


export default async function page() {
    const user = await getCurrentUser();
    return (
        <div>
            <Navbar/>
            <Deposits currentUser={user}/>
            <Footer/>
        </div>
    );
}
