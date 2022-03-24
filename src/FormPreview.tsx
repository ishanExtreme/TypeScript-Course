import React, { useState } from "react";
import AppContainer from "./AppContainer";
import FormField from "./FormField";
import Header from "./Header";
import {navigate} from 'raviger'

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

let curr_form_data:formData

export default function FormPreview(props:{id:number}) {

    const getLocalForms: ()=>formData[] = ()=>{
        const savedFormsJSON = localStorage.getItem("savedForms")
        return savedFormsJSON 
        ? JSON.parse(savedFormsJSON) 
        : []
    
    }

    const initialStage : ()=>formField[] = ()=>{
        const localForms = getLocalForms()
        curr_form_data = localForms.filter((form)=> props.id === form.id)[0]
        return curr_form_data.formFields

    }

    const [form, setForm] = useState<formField[]>(()=>initialStage())
    // next and submit
    const [buttonState, setButtonState] = useState<string>("next")
    const [currFieldIndex, setCurrFieldIndex] = useState<number>(0)

    const nextField = ()=>{
        // check if this is the last field
        if(currFieldIndex+2 >= form.length)
        {
        // if last field display submit
            setButtonState("submit")
            setCurrFieldIndex(currFieldIndex+1)
        }
        else
        // else increase counter
            setCurrFieldIndex(currFieldIndex+1)
    }

    const prevField = ()=>{
        setButtonState("next")
        if(currFieldIndex > 0)
            setCurrFieldIndex(currFieldIndex-1)
    }

    const saveFormData = ()=>{
        
        const curr_form = curr_form_data
        curr_form.formFields = form
        const all_forms_string = localStorage.getItem("userData")
        const all_forms = all_forms_string?JSON.parse(all_forms_string):[]
        
        localStorage.setItem("userData", JSON.stringify([...all_forms, curr_form]))
    } 

    const submitForm = ()=>{
        saveFormData();
        // redirect to homepage
        navigate("/");

    }

    const handleChange = (e:any)=>{
        console.log(e.target.value)
        e.preventDefault()
        setForm(
          form.map((field)=>{
            if(e.target.id === field.id.toString())
                return {
                    ...field,
                    value: e.target.value
                }
            return field
          })
      )
    }

    return (
        
        <AppContainer>
          {form.length === 0 ? 
             <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
                <h1>Form is Empty</h1>
            </div>
            :
            <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        
                <Header title={curr_form_data.title}/>
        
                <div className="mt-5 mb-5">

                <FormField label={form[currFieldIndex].label} type={form[currFieldIndex].type} handleChangeCB={handleChange} value={form[currFieldIndex].value} id={form[currFieldIndex].id.toString()} focus={true}/>
        
                </div> 
                
                <div className="flex space-x-2 justify-center">
                    {currFieldIndex>0&&
                        <button 
                        type="submit"
                        onClick={prevField} 
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Previous
                        </button>
                    }
                    {buttonState === "next"?
                        <button 
                        type="submit"
                        onClick={nextField} 
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Next
                        </button>
                    :
                        <button 
                        type="submit"
                        onClick={submitForm} 
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Submit
                        </button>
                    }
                    
                </div>
        
            </div>
          }
        </AppContainer>
    );
}