import React, { useState } from "react";

export default function DropDownEditView (
    props:{
        label:string,
        value:string,
        handleChangeCB:(e:any)=>void,
        handleClickCB:()=>void,
        id:string, 
        options:string[],
        handleAddOptionCB:(option:string, id:string)=>void 
    }) {
    
    const [addOption, setAddOption] = useState<string>("")
    
    const handleChange = (e:any)=>{

        e.preventDefault()
        setAddOption(e.target.value)
    }

    const handleAddUtil: ()=>void = ()=>{
        props.handleAddOptionCB(addOption, props.id)
        setAddOption("")
    }
    
    return (
    <div>
    <div className="flex flex-col w-[30rem] p-5 justify-center items-center">

        <div className="flex items-center gap-2">
            <input
            type="text"
            className="form-control block max-w-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id={props.id}
            value={props.value}
            onChange={props.handleChangeCB}
            />

            <div className="dropend relative">
                <button
                    className="dropdown-toggle max-w-5 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                    type="button"
                    id="dropdownMenuButton1e"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {props.label}
                    <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-right"
                    className="w-1.5 ml-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192 512"
                    >
                    <path
                        fill="currentColor"
                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                    ></path>
                    </svg>
                </button>
                <ul
                    className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                    aria-labelledby="dropdownMenuButton1e"
                >
                    {props.options.map((option, index)=>(
                        <li key={index}>
                            <a
                            className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                            href="#"
                            >
                                {option}
                            </a>
                        </li>
                    ))}
                   
                </ul>
                </div>

        </div>

        <div className="flex items-center gap-2 mt-5">
            <input
            type="text"
            className="form-control block max-w-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={addOption}
            onChange={handleChange}
            placeholder="Your Dropdown Option"
            />
            
            <button type="button" onClick={handleAddUtil} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">ADD</button>
            

        </div>

    </div>
    <div className="flex space-x-2 justify-center">
        <button
        onClick={props.handleClickCB} 
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Remove
        </button>
    </div>
    </div>
    );
}