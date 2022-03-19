import React from "react";
import { useState, useEffect } from 'react';
import AppContainer from './AppContainer';
import FormFieldPrev from "./FormFieldPrev";
import Header from './Header';

interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface formField{
    id: number;
    label: string;
    type: string;
    value: string;
}

export default function PrevForm(props:{closeFormCB:()=>void, id:number}){

  const getLocalForm: ()=>formData[] = ()=>{
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON 
    ? JSON.parse(savedFormsJSON) 
    : []

  }

    const initialStage : ()=>formData = ()=>{
        const localForms = getLocalForm()
        
        return localForms.filter((form)=> props.id === form.id)[0]
    }



    // Using arrow function prevents calling intial stage function again and again
    // on re render
    const [fields, setFields] = useState(()=>initialStage())

    useEffect(()=>{
        /* 
        For changing form title on mounting and reverting it back to original on
        dismounting
        */ 

        const oldTitle = document.title;
        document.title = "Form Preview";

        return ()=>{
            document.title = oldTitle;
        };
    },[])


    return (
        <AppContainer>
          <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
    
            <Header title="Welcome to #react-typescript with #tailwindcss "/>
    
            <div className="ml-12 mt-5 mb-5">

              <FormFieldPrev label="Form Title" type="text" value={fields.title} id={String(new Date())}/>
    
              {fields.formFields.map((field)=>(
                <FormFieldPrev key={field.id} label={field.label} type={field.type} value={field.value} id={field.id.toString()}/>
              ))}
    
            </div> 

            <div className="flex space-x-2 justify-center mt-5">
              <button 
              onClick={props.closeFormCB}
              type="button" 
              className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                Close Form
              </button>
            </div>
    
          </div>
        </AppContainer>
      );
}