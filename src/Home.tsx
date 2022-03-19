import React from "react";
import AppContainer from "./AppContainer";

export default function Home(props:{openFormCB:()=>void}) {

    return (
        <AppContainer>
            
            <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
                <a href="#!">
                <div className="bg-black flex justify-center">
                    <img className="rounded-t-lg" src="./images/logo.png" alt=""/>
                </div>
                </a>
                <div className="p-6">
                <h2 className="text-green-600 text-4xl font-bold mb-2 text-center">Custom Form Creator</h2>
                <p className="text-gray-700 text-base mb-4">
                    Create your own custom form and share it with others to get insight easily with visuals in graphs.
                </p>
                <div className="flex justify-center">
                    <button onClick={props.openFormCB} type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Open Form
                    </button>
                </div>
                </div>
            </div>

        </AppContainer>
    );
}