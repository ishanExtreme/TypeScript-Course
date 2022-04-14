import React, {useContext} from "react";
import { user } from "../types/user";
import Navbar from "./Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppContainer(props:{currentUser:user, children:React.ReactNode}) {
    

    return (
        <>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            <ToastContainer />
            <Navbar user={props.currentUser}/>
            <div className="flex h-screen bg-gray-100 items-center">
                {props.children}
            </div>
        </>
    )
}