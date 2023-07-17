'use client'
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {toast} from "react-hot-toast";
import {SubmitHandler, useForm} from "react-hook-form";
import {signOut} from "next-auth/react";

interface modelsProps {
    isOpen: boolean,
    closeModel: any,
    label: string,
    type: string,
    placeholder: string,
    buttonName: string,
    email: string,
    field_to_update: string,
}

interface FormValues {
    value: string
}

const updateProfile = async (field_to_update: string, new_value: string, email: string) => {
    try {
        const response = await fetch('/api/updateprof', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                field_to_update: field_to_update,
                new_value: new_value,
                email: email,
            }),
        });

        if (response.ok)
            return await response.json();

    } catch (error: any) {
        throw new Error(error.message);
    }
}

const Models: React.FC<modelsProps> = ({
                                           isOpen,
                                           closeModel,
                                           label,
                                           placeholder,
                                           buttonName,
                                           type,
                                           email,
                                           field_to_update
                                       }) => {

    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit} = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        try {
            setLoading(true);

            switch (field_to_update) {
                case "email":
                    if (data.value.length == 0) {
                        setLoading(false);
                        return toast.error('Email cannot be empty');
                    }

                    if (data.value === email) {
                        setLoading(false);
                        return toast.error('You already have this email');
                    }
                    break;
                case "fullname":
                    if (data.value.length < 4) {
                        setLoading(false);
                        return toast.error('Name must contain at least 4 characters')
                    }
                    break;
                case "hashedPassword":
                    if (data.value.length < 8) {
                        setLoading(false);
                        return toast.error('Password must be greater than 8 characters')
                    }

                    break;
                case "accountType":
                    if (data.value.toLowerCase() !== "current" && data.value.toLowerCase() !== "saving") {
                        setLoading(false);
                        return toast.error('Invalid Account Type')
                    }
                    break;
            }

            const isUpdated = await updateProfile(field_to_update as string, data.value as string, email as string);

            if (isUpdated) {
                toast.error('Logged out session, re-login!');
                toast.success(`${field_to_update} Updated Successfully`)

                setLoading(false);

                setTimeout(() => {
                }, 3000)

                signOut();
                closeModel();
            } else {
                toast.error(isUpdated.error);
            }
        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    return (
        <>
            <Modal isOpen={isOpen}
                   onRequestClose={closeModel}
                   contentLabel="Example Model"
                   className="absolute rounded-[30px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] backdrop-blur-ld bg-gray-500/30 bg-opacity-85 flex justify-center items-center"
                   overlayClassName="fixed inset-0 backdrop-blur-sm"
                   ariaHideApp={false}
            >
                <form id="actualmodal" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center py-6 px-8">
                        <label htmlFor="input-group-1"
                               className="text-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                        </label>
                        <div className="relative mb-6">
                            <input type={type} id="input-group-1"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-center  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={placeholder} {...register('value')}/>
                        </div>
                        <button
                            className={`my-6 w-full bg-black text-white p-2 ${isLoading && 'opacity-25 cursor-not-allowed'}`}
                            type="submit">
                            {buttonName}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}


export default Models;
