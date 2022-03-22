import React, { useState } from "react";

export default function RadioEditView (
    props:{
        handleClickCB:()=>void,
        id:string, 
        options:string[],
        handleAddOptionCB:(option:string, id:string)=>void 
    }
){

    const [radioOption, setRadioOption] = useState<string>("")

    const handleChange = (e:any)=>{

        e.preventDefault()
        setRadioOption(e.target.value)

    }

    const handleAddOptionUtil: ()=>void = ()=>{
        props.handleAddOptionCB(radioOption, props.id)
        setRadioOption("")
    }

    return (
    <div className="mb-3">
        <div className="flex flex-col justify-center items-center  border-2 border-cyan-400 w-[30rem] h-[10rem] px-5 py-5 overflow-auto">

            <div className="flex items-center gap-2 mb-5">

                <input
                type="text"
                className="form-control block max-w-lg px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={radioOption}
                onChange={handleChange}
                placeholder="Your Radio Option"
                />
                
                <button onClick={handleAddOptionUtil} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">ADD</button>
                
            </div>

            {props.options.map((option)=>(
                <div className="form-check">
                    <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label className="form-check-label inline-block text-gray-800">
                        {option}
                    </label>
                </div>
            ))}
           


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