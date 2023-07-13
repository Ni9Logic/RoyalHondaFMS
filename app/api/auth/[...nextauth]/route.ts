import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '../../../lib/prismadb';
import { webUser } from '@prisma/client';

const authOptions: AuthOptions = {
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
    secret: process.env.SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
