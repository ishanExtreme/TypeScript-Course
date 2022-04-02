import React from "react";
import { useState, useEffect, useReducer} from 'react';
import AppContainer from './AppContainer';
import FormField from './FormField';
import Header from './Header';
import {Link} from 'raviger'
import {formData, formField} from '../types/form'
import {FormAction} from '../types/action'
import DropDownEditView from "./DropDownEditView";
import DropDownField from "./DropDownField"
import RadioEditView from "./RadioEditView";
import MultiSelectEditView from "./MultiSelectEditView";

const fieldTypeOptions = ["text", "email", "date", "tel", "dropdown", "textArea", "radio", "multiselect"]

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

    const getNewField:()=>formField = ()=>{
      let newFieldObj:formField
    
      if(fieldType === "dropdown")
      {
        newFieldObj = {
          kind:"dropdown",
          id: Number(new Date()),
          label: newField,
          value:"",
          options: []
        }
      }
      else if(fieldType === "textArea")
      {
        newFieldObj = {
          kind:"textArea",
          id: Number(new Date()),
          label: newField,
          value:"",
        }
      }
      else if(fieldType === "radio")
      {
        newFieldObj = {
          kind:"radio",
          id: Number(new Date()),
          label: newField,
          value:"",
          options:[]
        }
      }
      else if(fieldType === "multiselect")
      {
        newFieldObj = {
          kind:"multiselect",
          id: Number(new Date()),
          label: newField,
          value:[],
          options:[]
        }
      }
      else
      {
        newFieldObj = {
            kind:"text",
            id: Number(new Date()),
            label: newField,
            type: fieldType,
            value:""
        }
      }


      return newFieldObj;
    }



    const reducer = (state: formData, action: FormAction) =>{

        switch(action.type) {
          case "add_field":
            let newFieldObj = getNewField()
            
            return({
              ...state,
              formFields: [
                ...state.formFields,
                newFieldObj,
              ]
            })

          case "remove_field":
            return ({
              ...state,
              formFields: state.formFields.filter((field)=> field.id !== action.id)
            })

          case "update_title":
            return({
              ...state,
              title: action.title
            })

          case "label_change":
            return({
              ...state,
              formFields: state.formFields.map((field)=>{
                if(action.id === field.id.toString())
                  return {
                    ...field,
                    label: action.label
                  }
                return field
              })
            })

          case "add_option":
            return({
              ...state,
              formFields: state.formFields.map((field)=>{
                if(action.id === field.id.toString() && 
                (field.kind === "dropdown" || field.kind === "radio" || 
                field.kind === "multiselect")
                )
                  return {
                    ...field,
                    options: [
                      ...field.options,
                      action.option
                    ]
                  }
                return field
              })
            })

          case "clear":
            setNewField("");

            return({
              ...state,
              formFields: state.formFields.map((field)=>{
                return {
                  ...field,
                  label: ""
                }
              }) 
            })

        }
    }
    // Using arrow function prevents calling intial stage function again and again
    // on re render
    const [fields, dispatch] = useReducer(reducer, null, ()=>initialStage())

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
  
   
  
    // const removeField = (id:number)=>{
    //   setFields({
    //     ...fields,
    //     formFields: fields.formFields.filter((field)=> field.id !== id)
    //   })
    // }

    // const handleFormTitleChange = (e:any)=>{
    //   e.preventDefault()
    //   setFields({
    //     ...fields,
    //     title: e.target.value
    //   })

    // }
  
    // const handleChange = (e:any)=>{
    //   e.preventDefault()
    //     setFields({
    //       ...fields,
    //       formFields: fields.formFields.map((field)=>{
    //         if(e.target.id === field.id.toString())
    //           return {
    //             ...field,
    //             label: e.target.value
    //           }
    //         return field
    //     })
    //   })
    // }

    // const handleAddOption = (option:string, id:string)=>{
    //     setFields({
    //       ...fields,
    //       formFields: fields.formFields.map((field)=>{
    //         if(id === field.id.toString() && 
    //         (field.kind === "dropdown" || field.kind === "radio" || 
    //         field.kind === "multiselect")
    //         )
    //           return {
    //             ...field,
    //             options: [
    //               ...field.options,
    //               option
    //             ]
    //           }
    //         return field
    //     })
    //   })
    // }

    const handleNewFieldChange = (e:any)=>{
      e.preventDefault()
      setNewField(e.target.value)
    }

    const handleTypeSelect = (option:string)=>{
      fieldType = option
    }


  
    // const clearCB = ()=>{
  
    //   setFields({
    //     ...fields,
    //     formFields: fields.formFields.map((field)=>{
    //       return {
    //         ...field,
    //         label: ""
    //       }
    //     }) 
    //   })

    //   setNewField("")
  
    // }

    const renderField = (field:formField)=>{
      switch(field.kind)
      {
        case "text":
          return (<FormField key={field.id} label={field.label} type="text" handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} value={field.label} id={field.id.toString()} handleClickCB={()=>dispatch({type:"remove_field", id:field.id})} focus={false}/>)
        
        case "dropdown":
          return (<DropDownEditView key={field.id} label={field.label} id={field.id.toString()} handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} value={field.label} options={field.options} handleAddOptionCB={(option, id)=>dispatch({type:"add_option", option:option, id:id})} handleClickCB={()=>dispatch({type:"remove_field", id:field.id})}/>)
        
        case "textArea":
          return (<FormField key={field.id} label={field.label} type="text" handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} value={field.label} id={field.id.toString()} handleClickCB={()=>dispatch({type:"remove_field", id:field.id})} focus={false}/>)
        
        case "radio":
          return (<RadioEditView key={field.id} id={field.id.toString()} handleClickCB={()=>dispatch({type:"remove_field", id:field.id})} options={field.options} handleAddOptionCB={(option, id)=>dispatch({type:"add_option", option:option, id:id})}/>)
        
        case "multiselect":
          return (<MultiSelectEditView key={field.id} id={field.id.toString()} label={field.label} handleClickCB={()=>dispatch({type:"remove_field", id:field.id})} options={field.options} value={field.label} handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} handleAddOptionCB={(option, id)=>dispatch({type:"add_option", option:option, id:id})}/>)  
        default:
          return (<div>None</div>)
      }
    }

    return (
        <AppContainer>
          <div className="p-4 px-10 mx-auto max-h-full bg-white shadow-lg rounded-xl overflow-auto">
    
            <Header title="Welcome to #react-typescript with #tailwindcss "/>
    
            <div className="flex flex-col items-center mt-5 mb-5">

              <FormField label="Form Title" type="text" handleChangeCB={(e)=>dispatch({type:"update_title", title:e.target.value})} value={fields.title} id={String(new Date())} focus={true}/>
    
              {fields.formFields.map((field)=>(
                renderField(field)
              ))}

              <div className="flex flex-col border-2 border-green-600 w-[30rem] p-5 justify-center items-center gap-y-2">
                {/* Select type dropdown */}
                <DropDownField label="Choose Type" options={fieldTypeOptions} handleSelectCB={handleTypeSelect}/>
                <FormField label="Add Field" type="text" handleChangeCB={handleNewFieldChange} value={newField} id={String(new Date())} handleClickCB={()=>dispatch({type:"add_field"})} focus={false}/>
              </div>
            </div> 
            
            <div className="flex space-x-2 justify-center">
              <button 
              type="submit" 
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Submit
              </button>
    
              <button
              onClick={()=>dispatch({type:"clear"})} 
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