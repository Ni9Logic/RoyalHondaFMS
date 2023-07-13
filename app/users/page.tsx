'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function page() {
   
    return (
        <>
            <Navbar />
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <svg className='animate-pulse' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="500" height="500" viewBox="0 0 80 80">
                        <path fill="#8bb7f0" stroke="#4e7ab5" stroke-miterlimit="10" d="M10.6,63.5c-2.8,0-5.1-2.3-5.1-5.1V21.6c0-2.8,2.3-5.1,5.1-5.1h58.9c2.8,0,5.1,2.3,5.1,5.1v36.9 c0,2.8-2.3,5.1-5.1,5.1H10.6z"></path><path fill="#ffeea3" stroke="#ba9b48" stroke-miterlimit="10" d="M12.5,27.5h14v10h-14V27.5z"></path><path fill="#ffeea3" d="M12,44h11v4H12V44z M27,44h11v4H27V44z M42,44h11v4H42V44z M57,44h11v4H57V44z"></path><path fill="#e1ebf2" d="M36,23h32v9H36V23z"></path><path fill="#ffeea3" d="M12,51h34v4H12V51z"></path>
                    </svg>
                </div>
            </section>
            <Footer />
        </>
    )
}
