'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function page() {
   
    return (
        <>
            <Navbar />
            <section className="text-gray-600 body-font">
                <div className='flex container mx-auto'>
                    <h1 className="text-3xl">Hi</h1>
                </div>
            </section>
            <Footer />
        </>
    )
}
