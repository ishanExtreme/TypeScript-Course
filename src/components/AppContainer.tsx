import React from "react";
import { user } from "../types/user";
import Navbar from "./Navbar";

export default function AppContainer(props:{currentUser:user, children:React.ReactNode}) {
    return (
        <>
            <Navbar user={props.currentUser}/>
            <div className="flex h-screen bg-gray-100 items-center">
                {props.children}
            </div>
        </>
    )
}