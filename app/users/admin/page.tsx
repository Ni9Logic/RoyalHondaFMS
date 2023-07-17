import getCurrentUser from "../../actions/getCurrentUser";
//@ts-ignore
import React from "react";
// @ts-ignore
import Navbar from "@/app/users/Navbar";
// @ts-ignore
import Footer from "@/app/users/Footer";

export default async function page() {
    const user = await getCurrentUser();
    if (!user?.admin)
        return (
            <div className="text-3xl mx-auto flex container text-center min-h-screen justify-center flex-col">
                You cannot access this web page
            </div>
        );


    return (
        <>
            <Navbar />
            <div className="text-3xl flex container justify-center mx-auto bg-red-500 text-center flex-col min-h-[75vh]">Congrats you're admin</div>
            <Footer />
        </>
    );
}