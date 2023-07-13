'use client';

import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthContextProps {
    children: React.ReactNode;
}

// Passing an object of AuthContextProps in the function
export default function AuthContext({ children }: AuthContextProps) {
    return <SessionProvider>{children}</SessionProvider>
};