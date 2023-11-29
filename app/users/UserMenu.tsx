import React from 'react';
import Link from 'next/link';
import getCurrentUser from '../actions/getCurrentUser';

export default async function UserMenu() {
    const user = await getCurrentUser();
    return (
        <section className="flex flex-col text-gray-600 body-font h-[75vh] justify-center items-center">
            {/* Implementation of how the user will update, view weightage and add assignments and modify the subjects */}
        </section>
    )
}