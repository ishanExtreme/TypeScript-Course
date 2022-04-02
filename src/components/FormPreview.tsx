import React, { Reducer, useReducer, useState } from "react";
import AppContainer from "./AppContainer";
import FormField from "./FormField";
import Header from "./Header";
import {navigate} from 'raviger'
import {formData, formField} from '../types/form'
import {PreviewAction} from '../types/action';
import DropDownField from "./DropDownField";
import TextAreaField from "./TextAreaField";
import RadioButtonField from './RadioButtonField'
import MultiSelectField from './MultiSelectField'

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

    const reducer:(state:formField[], action:PreviewAction)=>formField[] = (state:formField[], action:PreviewAction)=>{
        switch(action.type) {
            case "value_change":
                return(
                    state.map((field)=>{
                      if(action.id === field.id.toString() && field.kind !== "multiselect")
                        return {
                            ...field,
                            value: action.value
                        }
                      return field
                    })
                )
            case "option_select":
                return(
                    state.map((field)=>{
                      if(action.id === field.id && field.kind !== "multiselect")
                        return {
                            ...field,
                            value: action.option
                        }
                      return field
                    })
                )
            case "multi_select":

                if(action.add)
                {
                    return(
                        state.map((field)=>{
                          if(action.id === field.id && field.kind === "multiselect")
                            return {
                                ...field,
                                value: [
                                    ...field.value,
                                    action.option
                                ]
                            }
                          return field
                        })
                    )
                }
                else
                {
                    return(
                        state.map((field)=>{
                          if(action.id === field.id && field.kind === "multiselect")
                            return {
                                ...field,
                                value: field.value.filter((value)=> value !== action.option)
                            }
                          return field
                        })
                    )
                }
        }
    }

    // refactoring only setForm as in here multiple type of action is performed
    const [form, dispatch] = useReducer(reducer, null, ()=>initialStage())
    // next and submit
    const [buttonState, setButtonState] = useState<string>("next")
    const [currFieldIndex, setCurrFieldIndex] = useState<number>(0)
    const [type, setType] = useState<string>("")

    const setTypeUtil:(field:formField)=>void = (field)=>{

        if(field.kind === "text")
            setType(field.type)
    }

    const nextField = ()=>{
        // check if this is the last field
        if(currFieldIndex+2 >= form.length)
        {
        // if last field display submit
            const ind = currFieldIndex+1
            setButtonState("submit")
            setCurrFieldIndex(ind)
            setTypeUtil(form[ind])
        }
        else
        {
        // else increase counter
            const ind = currFieldIndex+1
            setCurrFieldIndex(ind)
            setTypeUtil(form[ind])
        }
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

    // const handleChange = (e:any)=>{
    //     e.preventDefault()
    //     setForm(
    //       form.map((field)=>{
    //         if(e.target.id === field.id.toString())
    //           return {
    //               ...field,
    //               value: e.target.value
    //           }
    //         return field
    //       })
    //     )
    // }

    // const handleOptionSelect = (option:string, id:number)=>{

    //     setForm(
    //         form.map((field)=>{
    //           if(id === field.id && field.kind !== "multiselect")
    //             return {
    //                 ...field,
    //                 value: option
    //             }
    //           return field
    //         })
    //     )

    // }

    // const handleMultiSelectClick: (option:string, add:boolean, id:number)=>void = 
    // (option, add, id)=>{

    //     if(add)
    //     {
    //         setForm(
    //             form.map((field)=>{
    //               if(id === field.id && field.kind === "multiselect")
    //                 return {
    //                     ...field,
    //                     value: [
    //                         ...field.value,
    //                         option
    //                     ]
    //                 }
    //               return field
    //             })
    //         )
    //     }
    //     else
    //     {
    //         setForm(
    //             form.map((field)=>{
    //               if(id === field.id && field.kind === "multiselect")
    //                 return {
    //                     ...field,
    //                     value: field.value.filter((value)=> value !== option)
    //                 }
    //               return field
    //             })
    //         )
    //     }
    // } 

    const renderField = (field:formField)=>{
        switch(field.kind)
        {
            case "text":
                return (<FormField label={field.label} type={field.type} handleChangeCB={(e)=>dispatch({type:"value_change", id:e.target.id, value: e.target.value})} value={field.value} id={field.id.toString()} focus={true}/>)
            
            case "dropdown":
                return (
                <div className="flex justify-center">
                    <DropDownField label={field.value?field.value:field.label} options={field.options} handleSelectCB={(option, id)=>dispatch({type:"option_select", option:option, id:id})} id={field.id} />
                </div>
                )
            case "textArea":
                return (<TextAreaField label={field.label} handleChangeCB={(e)=>dispatch({type:"value_change", id:e.target.id, value: e.target.value})} id={field.id.toString()} value={field.value}  />)
            
            case "radio":
                return (<RadioButtonField id={field.id} options={field.options} handleSelectCB={(option, id)=>dispatch({type:"option_select", option:option, id:id})}/>)
            
            case "multiselect":
                return (<MultiSelectField id={field.id} options={field.options} handleSelectCB={(option, add, id)=>dispatch({type:"multi_select", option:option, add:add, id:id})}/>)
            
            default:
                return (<div>None</div>)
        }
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
                    {renderField(form[currFieldIndex])}
                    
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