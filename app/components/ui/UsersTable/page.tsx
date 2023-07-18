import {columns} from "./columns";

import {UsersTable} from "./data-table";
// @ts-ignore
import getAllUsers from "@/app/actions/getAllUsers";

export default async function page() {
    const allUsers = await getAllUsers;

    if (!allUsers)
        return null;

    return (
        <>
            <UsersTable columns={columns} data={allUsers}/>
        </>
    );

}