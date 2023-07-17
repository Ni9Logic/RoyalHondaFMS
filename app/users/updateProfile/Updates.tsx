'use client'

import React, {useState} from "react";
import {webUser} from "@prisma/client";
import Link from "next/link";
import Models from "./Models";

interface updateProps {
    currentUser: webUser
}

const Updates: React.FC<updateProps> = ({currentUser}) => {
    const [modalState, setModalState] = useState({
        showPopOver: false,
        emailModalIsOpen: false,
        full_nameModalIsOpen: false,
        passwordModalIsOpen: false,
        account_typeModalIsOpen: false,
        phoneModalIsOpen: false,
    });

    const setOpenState = (modalName: string, state: boolean) => {
        setModalState(prevState => ({...prevState, [modalName]: state}));
    }


    if (!currentUser?.email || !currentUser?.hashedPassword || !currentUser?.fullname || !currentUser?.Balance || !currentUser?.accountType || !currentUser?.phone)
        return null;


    return (
        <>
            <div className='flex flex-col justify-center items-center h-[75vh] gap-10'>
                <h1 className='font-mono font-semibold text-3xl'>Profile Details</h1>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Account ID
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.id}
                            </td>
                            <td className="pl-[100px] pr-[50px] py-4 text-gray-400 dark:text-gray-600">
                                Not Editable
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Email
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.email}
                            </td>
                            <td className="pl-[150px] pr-[50px] py-4 text-blue-600 hover:underline">
                                <a onClick={() => setOpenState('emailModalIsOpen', true)} href="#">
                                    Edit
                                </a>
                                <Models isOpen={modalState.emailModalIsOpen}
                                        closeModel={() => setOpenState('emailModalIsOpen', false)}
                                        label={"Enter New Email"}
                                        type={"email"}
                                        placeholder={"name@email.com"}
                                        buttonName={"Update Email"}
                                        email={currentUser?.email}
                                        field_to_update={"email"}
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Full name
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.fullname}
                            </td>
                            <td className="pl-[150px] pr-[50px] py-4 text-blue-600 hover:underline">
                                <a onClick={() => setOpenState('full_nameModalIsOpen', true)} href="#">
                                    Edit
                                </a>
                                <Models isOpen={modalState.full_nameModalIsOpen}
                                        closeModel={() => setOpenState('full_nameModalIsOpen', false)}
                                        type={"text"}
                                        label={"Enter New Full Name"}
                                        placeholder={"Muhammad Rohail"}
                                        buttonName={"Update Full Name"}
                                        email={currentUser?.email}
                                        field_to_update={'fullname'}
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Password
                            </th>
                            <td className="px-6 py-4 flex flex-row">
                                {currentUser?.hashedPassword}
                                <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <button onClick={() => setOpenState('showPopOver', !modalState.showPopOver)}
                                            data-popover-target="popover-description"
                                            data-popover-placement="bottom-end" type="button">
                                        <svg className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
                                             aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clipRule="evenodd">
                                            </path>
                                        </svg>
                                        <span className="sr-only">Show information</span></button>
                                </p>
                                {modalState.showPopOver && <div id="popover-description" role="tooltip"
                                                                className="absolute z-10 inline-block text-sm backdrop-filter backdrop-blur-lg text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-[500px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                    <div className="p-3 space-y-2">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            Encrypted Password
                                        </h3>
                                        <p>
                                            Even we cannot see what your old password was, only you and you know what
                                            your password is inside your mind.
                                        </p>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Editing</h3>
                                        <p>
                                            You can still change your password by clicking the edit button
                                        </p>
                                    </div>
                                    <div data-popper-arrow={true}></div>
                                </div>}
                            </td>
                            <td className="pl-[150px] pr-[50px] py-4 text-blue-600 hover:underline">
                                <a onClick={() => setOpenState('passwordModalIsOpen', true)} href="#">
                                    Edit
                                </a>
                                <Models isOpen={modalState.passwordModalIsOpen}
                                        closeModel={() => setOpenState('passwordModalIsOpen', false)}
                                        label={"Enter New Password"}
                                        type={"password"}
                                        placeholder={"***********"}
                                        buttonName={"Update Password"}
                                        email={currentUser?.email}
                                        field_to_update={"hashedPassword"}
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Account Type
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.accountType}
                            </td>
                            <td className="pl-[150px] pr-[50px] py-4 text-blue-600 hover:underline">
                                <a onClick={() => setOpenState('account_typeModalIsOpen', true)} href="#">
                                    Edit
                                </a>
                                <Models isOpen={modalState.account_typeModalIsOpen}
                                        closeModel={() => setOpenState('account_typeModalIsOpen', false)}
                                        label={"Enter New Account Type"}
                                        type={"text"}
                                        placeholder={"Saving or Current"}
                                        buttonName={"Update Account Type"}
                                        email={currentUser?.email}
                                        field_to_update={"accountType"}
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Phone Number
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.phone}
                            </td>
                            <td className="pl-[150px] pr-[50px] py-4 text-blue-600 hover:underline">
                                <a onClick={() => setOpenState('phoneModalIsOpen', true)} href="#">
                                    Edit
                                </a>
                                <Models isOpen={modalState.phoneModalIsOpen}
                                        closeModel={() => setOpenState('phoneModalIsOpen', false)}
                                        label={"Enter New Phone Number"}
                                        type={"text"}
                                        placeholder={"+92-330-0000000"}
                                        buttonName={"Update Phone Number"}
                                        email={currentUser?.email}
                                        field_to_update={"phone"}
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Created At
                            </th>
                            <td className="px-6 py-4">
                                {JSON.stringify(currentUser?.createdAt)}
                            </td>
                            <td className="pl-[100px] pr-[50px] py-4 text-gray-400 dark:text-gray-600">
                                Not Editable
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Admin Status
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.admin ? 'Yes' : 'No'}
                            </td>
                            <td className="pl-[100px] pr-[50px] py-4 text-gray-400 dark:text-gray-600">
                                Not Editable
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Balance
                            </th>
                            <td className="px-6 py-4">
                                {currentUser?.Balance}
                            </td>
                            <td className="pl-[100px] pr-[50px] py-4 text-gray-400 dark:text-gray-600">
                                Not Editable
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Link href={"/users"}>
                    <button
                        className=" w-[200px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Updates;