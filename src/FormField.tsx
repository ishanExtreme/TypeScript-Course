import React from "react";

export default function FormField(props:{label:string, type:string, handleChangeCB:(e:any)=>void, value:string, id:string, handleClickCB:()=>void}){
    return (
        <div className="form-floating mb-3 xl:w-96">
                <input
                id={props.id} 
                type={props.type}
                onChange={props.handleChangeCB}
                value={props.value} 
                className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 
                focus:bg-white 
                focus:border-blue-600 
                focus:outline-none"/>
                
                <label htmlFor="floatingInput" className="text-gray-700">
                    {props.label}
                </label>


                <div className="flex space-x-2 justify-center">
                    <button
                    onClick={props.handleClickCB} 
                    className="inline-block px-6 py-2.5 
                    bg-blue-600 
                    text-white 
                    font-medium text-xs 
                    leading-tight 
                    uppercase 
                    rounded shadow-md 
                    hover:bg-blue-700 
                    hover:shadow-lg 
                    focus:bg-blue-700 
                    focus:shadow-lg 
                    focus:outline-none 
                    focus:ring-0 
                    active:bg-blue-800 
                    active:shadow-lg 
                    transition 
                    duration-150 ease-in-out">
                        {props.label === "Add Field"?"Add Field":"Remove"}
                    </button>
                </div>
              
        </div>
    )
}