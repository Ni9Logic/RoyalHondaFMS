import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from "next-auth";

import prisma from '@/app/lib/prismadb';

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials')
                }

                const user: any = await prisma.webUser.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // Now checking if the user exists or not
                if (!user) {
                    throw new Error('Invalid Credentials')
                }

                // Now comparing the password of the user
                const isCorrect = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isCorrect) {
                    throw new Error('Invalid Credentials')
                }

                // If all of the above cases are true then lets return user
                return user;
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;

