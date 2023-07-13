'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

export default function page() {
    return (
        <div>
            <button onClick={() => {
                signOut({redirect: false});
            }}>Log Out</button>
        </div>
    )
}
