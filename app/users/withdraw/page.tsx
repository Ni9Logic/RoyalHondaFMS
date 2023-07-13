import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import updateBalance from '@/actions/updateUserBalance'
import getCurrentUser from '@/actions/getCurrentUser';

export default async function page() {
    // Update balance is working good
    // Just have to figure out a way where I can use the 'use client' for interactivity
    const update = await updateBalance(3000); 
    const user = await getCurrentUser();

    if (!update){
        console.log('Error occurred')
    }
    return (
        <div>
            <Navbar />
            {user?.Balance}
            <Footer />
        </div>
    )
}
