import React, { useEffect, useReducer, useState } from "react";
import FormField from "../components/FormField";
import Header from "../components/Header";
import {navigate} from 'raviger'
import {formField} from '../types/form'
import {PreviewAction} from '../types/action';
import DropDownField from "../components/DropDownField";
import TextAreaField from "../components/TextAreaField";
import RadioButtonField from '../components/RadioButtonField'
import MultiSelectField from '../components/MultiSelectField'
import { getFormAnonymous, getFormFieldsPaginated, makeSubmission } from "../apis/apiTypeForm";
import { formAnswer, FormFieldApi, formSubmission } from "../types/apis";
import { triggerToast } from "../utils/notification";

let formTitle:string
let formDescription:string
let formPublic:boolean

let inStoreCount:number = -1

const setFormTitleApi = async (id:number, setLoading:(load:boolean)=>void)=>{
    
    setLoading(true)
    const data = await getFormAnonymous(id)
    formTitle = data.title
    formDescription = data.description
    formPublic = data.is_public
    setLoading(false)
}

const getFormField:(
    id:number, 
    offset:number, 
    dispatch:(action:PreviewAction)=>void,
    setLoading:(load:boolean)=>void,
    setCount:(count:number)=>void,
    )=>void= async (id, offset, dispatch, setLoading, setCount)=>{

        try
        {

            setLoading(true)
            
            const data = await getFormFieldsPaginated(id, {offset:offset, limit:1})

            const formFieldApi = data.results
            const count = data.count
            // console.log(formFieldApi)
            const formFields:formField[] = formFieldApi.map((formField:FormFieldApi)=>{
                if(formField.kind !== "RADIO" &&  formField.kind !== "DROPDOWN")
                {
                return {
                    id:formField.id,
                    kind: formField.meta.type,
                    label: formField.label,
                    value: formField.value,
            
                }
                }
                else
                {
                return {
                    id:formField.id,
                    kind: formField.meta.type,
                    label: formField.label,
                    value: formField.value,
                    options: formField.options
                }
                }
            })
            dispatch({type:"initial_stage", stage:formFields[0]})
            inStoreCount++
            setCount(count)
            setLoading(false)

        }
        catch(error)
        {
            console.log(error)
        }
    

      
}

export default function FormPreview(props:{id:number}) {

    // const getLocalForms: ()=>formData[] = ()=>{
    //     const savedFormsJSON = localStorage.getItem("savedForms")
    //     return savedFormsJSON 
    //     ? JSON.parse(savedFormsJSON) 
    //     : []
    
    // }

    const initialStage : ()=>formField[] = ()=>{

        const formFields:formField[] = [] as formField[]

        return formFields

    }

    const reducer:(state:formField[], action:PreviewAction)=>formField[] = (state:formField[], action:PreviewAction)=>{
        switch(action.type) {

            case "initial_stage":
                return [...state, action.stage]

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
    const [loading, setLoading] = useState(false)
    const [fieldCount, setFieldCount] = useState(0)
    // const [type, setType] = useState<string>("")

    // const setTypeUtil:(field:formField)=>void = (field)=>{

    //     if(field.kind === "text")
    //         setType(field.type)
    // }

    // First Field of form
    useEffect(()=>{

        getFormField(props.id, 0, dispatch, setLoading, setFieldCount)
        setFormTitleApi(props.id, setLoading)


    },[])


    const nextField = ()=>{
        // check if this is the last field
        if(currFieldIndex+1 >= fieldCount)
        {
            setButtonState("submit")
        }
        else if(currFieldIndex+2 >= fieldCount)
        {
        // if last field display submit
            const ind = currFieldIndex+1
            if(ind > inStoreCount)
                getFormField(props.id, ind, dispatch, setLoading, setFieldCount)
            setButtonState("submit")
            setCurrFieldIndex(ind)
            // setTypeUtil(form[ind])
        }
        else
        {
        // else increase counter
            const ind = currFieldIndex+1
            if(ind > inStoreCount)
                getFormField(props.id, ind, dispatch, setLoading, setFieldCount)
            setCurrFieldIndex(ind)
            // setTypeUtil(form[ind])
        }
    }

    const prevField = ()=>{
        setButtonState("next")
        if(currFieldIndex > 0)
            setCurrFieldIndex(currFieldIndex-1)
    }

    // const saveFormData = ()=>{
        
    //     const curr_form = curr_form_data
    //     curr_form.formFields = form
    //     const all_forms_string = localStorage.getItem("userData")
    //     const all_forms = all_forms_string?JSON.parse(all_forms_string):[]
        
    //     localStorage.setItem("userData", JSON.stringify([...all_forms, curr_form]))
    // } 

    
    const submitForm = async ()=>{
        
        setLoading(true)
        const submission:formSubmission = {
            answers: [] as formAnswer[],
            form: {
                title: formTitle,
                description: formDescription,
                is_public: formPublic
            }
        }

        form.forEach((field)=>{
            if(field.kind !== "multiselect")
            {
                const answer:formAnswer = {
                    form_field: field.id,
                    value: field.value
                }
                submission.answers.push(answer)
            }
        })

        try{
            await makeSubmission(props.id, submission)
            triggerToast("success", "Form submitted succesfully!!!")
        }
        catch(error)
        {
            console.log(error)
            triggerToast("error", "Server Error, Please try again later.")
        }
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
                return (<FormField label={field.label} type={field.kind} handleChangeCB={(e)=>dispatch({type:"value_change", id:e.target.id, value: e.target.value})} value={field.value} id={field.id.toString()} focus={true}/>)
        }
    }

    return (
        
            loading?
                <div className="flex flex-col justify-center items-center p-4 w-[30rem] h-[20rem] mx-auto bg-white shadow-lg rounded-xl">
                    <div className="flex flex-row justify-center  mt-3 mb-3"> 
                        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            :
                fieldCount === 0 ? 
                <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
                    <h1>Form is Empty</h1>
                </div>
                :
                <div className="flex flex-col justify-center items-center p-4 w-[30rem] h-[20rem] mx-auto bg-white shadow-lg rounded-xl">
            
                    <Header title={formTitle}/>

                    
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
            
        
    );
}