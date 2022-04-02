import React from "react";

export default function TextAreaField (
    props:{
        label:string, 
        handleChangeCB:(e:any)=>void, 
        value:string, 
        id:string, 
    }){

    return(
        <div className="mb-3 xl:w-96">
            <label className="form-label inline-block mb-2 text-gray-700">
                {props.label}
            </label>
            <textarea
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id={props.id}
            onChange={props.handleChangeCB}
            value={props.value}
            rows={4}
            placeholder="Your message"
            >
            </textarea>
      </div>
    );
}