"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {Button} from "@/app/components/ui/button";
import {useRouter} from "next/navigation";
import Models from "@/app/users/updateProfile/Models";
import Modal from "react-modal";
// There was error with nextRouter from next/router

const getTheUser = async (email: string) => {
    try {
        const response = await fetch('/api/getUser', {
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
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit} = useForm<FormValues>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editFullnameModel, setEditFullnameModel] = useState(false);
    const router = useRouter();


    const onSubmit: SubmitHandler<FormValues> = async (email) => {
        try {
            setLoading(true);
            const isUser = await getTheUser(email.email as string);
            if (!isUser) {
                toast.error(isUser.message);
                setLoading(false);
                return null;
            }

            toast.success('User Found');
            setUserEmail(email.email);
            setIsOpen(true);
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
                        placeholder="name@email.com"
                        {...register('email')}
                        type="email"
                        required/>
                    <Button className="flex flex-col container my-8 w-[300px] justify-center items-center"
                            disabled={isLoading}
                            type="submit">
                        Edit User
                    </Button>
                </form>
                {modalIsOpen &&
                    <>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setIsOpen(false)}
                            contentLabel="Editing the user"
                            className="absolute rounded-[30px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] backdrop-blur-ld bg-gray-500/30 bg-opacity-85 items-center justify-center flex"
                            overlayClassName="fixed inset-0 backdrop-blur-sm"
                            ariaHideApp={false}
                        >
                            <div className="flex flex-col grid-rows-2 gap-6">
                                <div className="container flex gap-16">
                                    <Button
                                        className="hover:bg-white hover:text-black w-[200px]"
                                        onClick={
                                            () => {
                                                setEditFullnameModel(true);
                                                setIsOpen(false);
                                            }
                                        }
                                    >
                                        Edit Username
                                    </Button>
                                    <Button
                                        className="hover:bg-white hover:text-black w-[200px]"
                                    >
                                        Edit Account type
                                    </Button>
                                    <Button
                                        className="hover:bg-white hover:text-black w-[200px]"
                                    >
                                        Edit Phone Number
                                    </Button>
                                </div>
                                <div className="container flex gap-16 rounded-l">
                                    <Button className="hover:bg-white hover:text-black w-[200px]">
                                        Edit Password
                                    </Button>
                                    <Button className="hover:bg-white hover:text-black w-[200px]">
                                        Edit Email
                                    </Button>
                                    <Button className="hover:bg-white hover:text-black w-[200px]">
                                        Edit Balance
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                    </>
                }
                {editFullnameModel &&
                    <Models
                        isOpen={editFullnameModel}
                        closeModel={() => setEditFullnameModel(false)}
                        field_to_update="fullname"
                        buttonName="Edit Username"
                        email={userEmail as string}
                        label="Enter Username"
                        placeholder="Muhammad Rohail"
                        type="text"
                    />
                }
                <button
                    className="flex flex-col container items-center w-[300px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                    onClick={() => router.push('/users')}>
                    Back
                </button>
            </div>


            <Footer/>
        </>
    )
        ;
}

export default Page;