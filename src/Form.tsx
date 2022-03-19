import React from "react";
import { useState, useEffect, useRef } from 'react';
import AppContainer from './AppContainer';
import FormField from './FormField';
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

const formFields = [
    {id:1, label: "First Name", type: "text", value:""},
    {id:2, label: "Last Name", type: "text", value:""},
    {id:3, label: "Email", type: "email", value:""},
    {id:4, label: "Phone Number", type: "tel", value:""},
    {id:5, label: "Date of Birth", type: "date", value:""},
]

export default function Form(props:{closeFormCB:()=>void, id:number, saveFormDataCB:(currentForm: formData)=>void}){

  const [newField, setNewField] = useState("")

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
        document.title = "Form Editor";

        return ()=>{
            document.title = oldTitle;
        };
    },[])

    useEffect(()=>{
        /* 
        Saving form data automatically after one second when user stops typing 
        */ 
        let timeout = setTimeout(()=>{
          props.saveFormDataCB(fields)
        }, 1000)

        return ()=>{
          clearTimeout(timeout)
        }
        
    }, [fields])
  
    const addField = ()=>{
      setFields({
        ...fields,
        formFields: [
          ...fields.formFields,
          {
            id: Number(new Date()),
            label: newField,
            type: "text",
            value:""
          },
        ]
      })
    }
  
    const removeField = (id:number)=>{
      setFields({
        ...fields,
        formFields: fields.formFields.filter((field)=> field.id !== id)
      })
    }

    const handleFormTitleChange = (e:any)=>{
      e.preventDefault()
      setFields({
        ...fields,
        title: e.target.value
      })

    }
  
    const handleChange = (e:any)=>{
        e.preventDefault()
        setFields({
          ...fields,
          formFields: fields.formFields.map((field)=>{
            if(e.target.id === field.id.toString())
              field.value = e.target.value
            return field
        })
      })
    }

    const handleNewFieldChange = (e:any)=>{
      e.preventDefault()
      setNewField(e.target.value)
    }


  
    const clearCB = ()=>{
  
      setFields({
        ...fields,
        formFields: fields.formFields.map((field)=>{
          field.value = ""
          return field
        }) 
      })

      setNewField("")
  
    }

    return (
        <AppContainer>
          <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
    
            <Header title="Welcome to #react-typescript with #tailwindcss "/>
    
            <div className="ml-12 mt-5 mb-5">

              <FormField label="Form Title" type="text" handleChangeCB={handleFormTitleChange} value={fields.title} id={String(new Date())} focus={true}/>
    
              {fields.formFields.map((field)=>(
                <FormField key={field.id} label={field.label} type={field.type} handleChangeCB={handleChange} value={field.value} id={field.id.toString()} handleClickCB={()=>removeField(field.id)} focus={false}/>
              ))}
    
              <FormField label="Add Field" type="text" handleChangeCB={handleNewFieldChange} value={newField} id={String(new Date())} handleClickCB={addField} focus={false}/>
            </div> 
            
            <div className="flex space-x-2 justify-center">
              <button 
              type="submit" 
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Submit
              </button>
    
              <button
              onClick={clearCB} 
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Clear
              </button>
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