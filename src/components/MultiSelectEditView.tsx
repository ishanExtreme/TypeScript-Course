import React, {useState} from "react";

export default function MultiSelectEditView (
    props:{
        label:string,
        value:string,
        handleChangeCB:(e:any)=>void,
        handleClickCB:()=>void,
        id:string, 
        options:string[],
        handleAddOptionCB:(option:string, id:string)=>void 
    }
) {

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
    <div >
        <div className="flex flex-col gap-3 w-[30rem] p-5 justify-center items-center">
            
            <input
            type="text"
            className="form-control block max-w-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id={props.id}
            value={props.value}
            onChange={props.handleChangeCB}
            placeholder="Change Label"
            />
            
            <div className="dropdown relative">
            
                <button
                    className="dropdown-toggle min-w-[20rem] justify-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {props.label}
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="caret-down"
                        className="w-2 ml-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                        fill="currentColor"
                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                        ></path>
                    </svg>
                </button>
                <ul
                className="dropdown-menu pl-2 w-[20rem] max-h-[10rem] absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none overflow-auto"
                aria-labelledby="dropdownMenuButton1"
                >
                    <div>

                        {props.options.map((option, index)=>(
                            <div key={index} className="form-check">
                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label inline-block text-gray-800" >
                                    {option}
                                </label>
                            </div>
                        ))}
                    
                    </div>
                

                </ul>
            </div>

            <div className="flex items-center gap-2">
                <input
                type="text"
                className="form-control block max-w-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={addOption}
                onChange={handleChange}
                placeholder="Your Multiselect Option"
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