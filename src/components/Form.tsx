import React from "react";
import { useState, useEffect} from 'react';
import AppContainer from './AppContainer';
import FormField from './FormField';
import Header from './Header';
import {Link} from 'raviger'
import {formData, formField, textFieldType} from '../types/form'
import DropDownEditView from "./DropDownEditView";
import DropDownField from "./DropDownField"

const fieldTypeOptions = ["text", "email", "date", "tel", "date", "dropdown"]

let fieldType:string

export default function Form(props:{id:number}){

  const [newField, setNewField] = useState("")

  const getLocalForm: ()=>formData[] = ()=>{
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON 
    ? JSON.parse(savedFormsJSON) 
    : []

  }

  const saveLocalForms = (localForms: formData[])=>{
    localStorage.setItem("savedForms", JSON.stringify(localForms))
  } 

  const saveFormData = (currentForm: formData)=>{
    const localForms = getLocalForm();
    const updatedLocalForms = localForms.map((form)=>
      form.id === currentForm.id ? currentForm : form
    )

    saveLocalForms(updatedLocalForms)
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
          saveFormData(fields)
        }, 1000)

        return ()=>{
          clearTimeout(timeout)
        }
        
    }, [fields])
  
    const addField = ()=>{
      let newFieldObj:formField
      if(fieldType !== "dropdown")
      {
        newFieldObj = {
            kind:"text",
            id: Number(new Date()),
            label: newField,
            type: fieldType,
            value:""
        }
      }
      else
      {
        newFieldObj = {
          kind:"dropdown",
          id: Number(new Date()),
          label: newField,
          value:"",
          options: []
        }
      }
      setFields({
        ...fields,
        formFields: [
          ...fields.formFields,
          newFieldObj,
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
              field.label = e.target.value
            return field
        })
      })
    }

    const handleAddOption = (option:string, id:string)=>{
        setFields({
          ...fields,
          formFields: fields.formFields.map((field)=>{
            if(id === field.id.toString() && field.kind === "dropdown")
              field.options.push(option)
            return field
        })
      })
    }

    const handleNewFieldChange = (e:any)=>{
      e.preventDefault()
      setNewField(e.target.value)
    }

    const handleTypeSelect = (option:string)=>{
      fieldType = option
    }


  
    const clearCB = ()=>{
  
      setFields({
        ...fields,
        formFields: fields.formFields.map((field)=>{
          field.label = ""
          return field
        }) 
      })

      setNewField("")
  
    }

    return (
        <AppContainer>
          <div className="p-4 px-10 mx-auto max-h-full bg-white shadow-lg rounded-xl overflow-auto">
    
            <Header title="Welcome to #react-typescript with #tailwindcss "/>
    
            <div className="flex flex-col items-center mt-5 mb-5">

              <FormField label="Form Title" type="text" handleChangeCB={handleFormTitleChange} value={fields.title} id={String(new Date())} focus={true}/>
    
              {fields.formFields.map((field)=>(
                field.kind === "text"?
                (<FormField key={field.id} label={field.label} type="text" handleChangeCB={handleChange} value={field.label} id={field.id.toString()} handleClickCB={()=>removeField(field.id)} focus={false}/>)
                :
                (<DropDownEditView key={field.id} label={field.label} id={field.id.toString()} handleChangeCB={handleChange} value={field.label} options={field.options} handleAddOptionCB={handleAddOption} handleClickCB={()=>removeField(field.id)}/>)
              ))}

              <div className="flex flex-col border-2 border-green-600 w-[30rem] p-5 justify-center items-center gap-y-2">
                {/* Select type dropdown */}
                <DropDownField label="Choose Type" options={fieldTypeOptions} handleSelectCB={handleTypeSelect}/>
                <FormField label="Add Field" type="text" handleChangeCB={handleNewFieldChange} value={newField} id={String(new Date())} handleClickCB={addField} focus={false}/>
              </div>
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
              <Link 
              href="/list"
              type="button" 
              className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                Close Form
              </Link>
            </div>
    
          </div>
        </AppContainer>
      );
}