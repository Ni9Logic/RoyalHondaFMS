"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {Button} from "@/app/components/ui/button";
import {useRouter} from "next/navigation";

const toMakeAdminUser = async (email: string) => {
    try {
        const response = await fetch('/api/setAdmin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            })
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.Error);
        }

        return data;
    } catch (error: any) {
        throw error;
    }
}

interface FormValues {
    email: string,
}

const Page: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit} = useForm<FormValues>();
    const router = useRouter();


    const onSubmit: SubmitHandler<FormValues> = async (email, ) => {
        try {
            setLoading(true);
            const isUser = await toMakeAdminUser(email.email as string);
            if (!isUser){
                toast.error(isUser.message);
                setLoading(false);
                return null;
            }

            toast.success('User Made Admin Successfully');
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="flex flex-col container min-h-[75vh] justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="flex flex-col container  w-[300px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter User Email"
                        {...register('email')}
                        type="email"
                        required/>
                    <Button className="flex flex-col container my-8 w-[300px] justify-center items-center"
                            disabled={isLoading}
                            type="submit">
                        Make Admin
                    </Button>
                </form>
                <button
                    className="flex flex-col container items-center w-[300px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                    onClick={() => router.push('/users')}>
                    Back
                </button>
            </div>


            <Footer/>
        </>
    );
}

export default Page;