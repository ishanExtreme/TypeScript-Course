import React from "react";
import AppContainer from "./AppContainer";

export default function ListForm() {

    return (
        <AppContainer>
            <div className="p-4 mx-auto bg-white shadow-lg rounded-xl min-w-[50%] text-center">
                <div className="py-3 px-6 border-b border-gray-300">
                    Your Saved Forms
                </div>
                <div className="p-6">

                    <div className="flex flex-row justify-center">
                        <p className="text-sky-500 text-center decoration-solid text-2xl mb-4 mr-2">
                            Form Title
                        </p>

                        <div className="grid ml-2 gap-1 grid-cols-3">
                            <button type="button" className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                <img src="./images/icons/prev.png"/>
                            </button>

                            <button type="button" className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                <img src="./images/icons/edit.png"/>
                            </button>

                            <button type="button" className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                <img src="./images/icons/del.png"/>
                            </button>
                        </div>


                    </div>
                </div>
                <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                    <button type="button" className="inline-block  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Home</button>
                </div>
               
            </div>
        </AppContainer>
    );

}