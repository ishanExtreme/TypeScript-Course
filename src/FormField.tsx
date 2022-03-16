import React from "react";

export default function FormField(props:{label:string, type:string, handleChangeCB:(e:any)=>void, value:string, id:string}){
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
        </div>
    )
}