import React from "react";
import { useState, useEffect, useReducer} from 'react';
import FormField from '../components/FormField';
import Header from '../components/Header';
import {Link, navigate} from 'raviger'
import {formData, formField, fieldType, textFieldType} from '../types/form'
import {FormAction} from '../types/action'
import DropDownEditView from "../components/DropDownEditView";
import DropDownField from "../components/DropDownField"
import RadioEditView from "../components/RadioEditView";
import MultiSelectEditView from "../components/MultiSelectEditView";
import { FormApi, FormFieldApi } from "../types/apis";
import { addFormField, changeForm, changeFormField, deleteFormField, getForm, getFormFields } from "../apis/apiTypeForm";
import { triggerToast } from "../utils/notification";
import Appear from "../animations/Appear";
import {motion} from 'framer-motion'

const fieldTypeOptions:fieldType[] = ["text", "email", "date", "tel", "dropdown", "textArea", "radio"]

let fieldTypeSet:fieldType

const getFields = async (id:number, 
  dispatch:(action:FormAction)=>void, 
  setLoading:(load:boolean)=>void)=>{
    
  const currentForm:FormApi = await getForm(id)
  const formFieldsApi = await getFormFields(id)

  const formFields:formField[] = formFieldsApi.results.map((formField:FormFieldApi)=>{
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

  const formData:formData = {
    id:id,
    title: currentForm.title,
    description: currentForm.description?currentForm.description:"",
    is_public: currentForm.is_public?currentForm.is_public: false,
    formFields: formFields
  }

  dispatch({type:"initial_stage", stage:formData})
  setLoading(false)
  
}

// let fieldCreated:boolean = false

const callAddFieldApi:(id:number, newField:formField)=>Promise<FormFieldApi> = async (id, newField)=>{

  let kind;

  if(newField.kind === "text" || newField.kind === "email" || newField.kind === "date" || newField.kind === "tel")
    kind = "TEXT"
  else if(newField.kind === "dropdown")
    kind = "DROPDOWN"
  else if(newField.kind === "radio")
    kind = "RADIO"
  else
    kind = "GENERIC"

  const fieldObj = {
    label: newField.label,
    kind: kind,
    options: newField.kind === "radio" || newField.kind === "dropdown"?newField.options:[],
    value: newField.value,
    meta: {type:newField.kind}
  }
  try
  {
    const data = await addFormField(id, fieldObj)
    return data

    
  }
  catch(error)
  {
    console.log(error)

  }


}

const childVariant = (delay:number)=> {
  
  return {
      hidden: { opacity: 0 },
      visible: { 
          opacity: 1,
          transition: {
              delay:delay
          }
      }
  }
}

export default function Form(props:{id:number}){

    const [newField, setNewField] = useState("")

    // const getLocalForm: ()=>formData[] = ()=>{
    //   const savedFormsJSON = localStorage.getItem("savedForms")
    //   return savedFormsJSON 
    //   ? JSON.parse(savedFormsJSON) 
    //   : []

    // }

    // const saveLocalForms = (localForms: formData[])=>{
    //   localStorage.setItem("savedForms", JSON.stringify(localForms))
    // } 

    // const saveFormData = (currentForm: formData)=>{
    //   const localForms = getLocalForm();
    //   const updatedLocalForms = localForms.map((form)=>
    //     form.id === currentForm.id ? currentForm : form
    //   )

    //   saveLocalForms(updatedLocalForms)
    // }

    useEffect (()=>{
        setLaoding(true)
        getFields(props.id, dispatch, setLaoding) 
    },[])  
    
    const initialStage : ()=>formData = ()=>{
        // const localForms = getLocalForm()
        
        // return localForms.filter((form)=> props.id === form.id)[0]
        // const currentForm = await getForm(props.id)
        // const formFields = await getFormFields(props.id)

        const formData:formData = {
          id:props.id,
          title: "",
          description: "",
          is_public: false,
          formFields: [] as formField[]
        }

        return formData
    }


    const getNewField:()=>formField = ()=>{
      
      
      switch(fieldTypeSet)
      {
        case "dropdown":
            return{
            kind:"dropdown",
            id: Number(new Date()),
            label: newField,
            value:"",
            options: []
            }
        
        case "textArea":
          return {
            kind:"textArea",
            id: Number(new Date()),
            label: newField,
            value:"",
          }

        case "radio":
          return {
            kind:"radio",
            id: Number(new Date()),
            label: newField,
            value:"",
            options:[]
          }

        case "multiselect":
          return {
            kind:"multiselect",
            id: Number(new Date()),
            label: newField,
            value:[],
            options:[]
          }

        default:
          return {
            kind: fieldTypeSet,
            id: Number(new Date()),
            label: newField,
            value:""
          }
          
      }
      
    }


    
    
    const reducer = (state: formData, action: FormAction) =>{

        switch(action.type) {
          case "initial_stage":
            return action.stage

          case "add_field":


            return({
              ...state,
              formFields: [
                ...state.formFields,
                action.field,
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


    const [loading, setLaoding] = useState(false)
    const [loadSubmit, setLoadSubmit] = useState(false)
    const [loadAdd, setLoadAdd] = useState(false)
    const [loadRemove, setLoadRemove] = useState(false)

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

    // useEffect(()=>{
    //     /* 
    //     Saving form data automatically after one second when user stops typing 
    //     */ 
    //     let timeout = setTimeout(()=>{
    //       saveFormData(fields)
    //     }, 1000)

    //     return ()=>{
    //       clearTimeout(timeout)
    //     }
        
    // }, [fields])
  
   
  
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

    const handleSubmit = async (e:any)=>{

      e.preventDefault()
      
      setLoadSubmit(true)
      try
      {
        // const res_data = await getFormFields(props.id)
        // const current_fields_state:formField = res_data.results

        // step-1 Change form title and description
        const newForm:FormApi = {
          title:fields.title,
          description: fields.description,
          is_public: fields.is_public
        }
        await changeForm(props.id, newForm)
        // step-2 Edit Fields Value
        fields.formFields.forEach(async (field)=>{

          let kind;

          if(field.kind === "text" || field.kind === "email" || field.kind === "date" 
          || field.kind === "tel")
            kind = "TEXT"
          else if(field.kind === "dropdown")
            kind = "DROPDOWN"
          else if(field.kind === "radio")
            kind = "RADIO"
          else
            kind = "GENERIC"


          const fieldObj = {
            label: field.label,
            kind: kind,
            options: field.kind === "radio" || field.kind === "dropdown"?field.options:[],
            value: field.value,
            meta: {type:field.kind}
          }

          await changeFormField(props.id, field.id, fieldObj)

        })
        navigate("/list")
        triggerToast("success", "Form saved successfully!!!")
        setLoadSubmit(false)
      }
      catch(error)
      {
        console.log(error)
        triggerToast("error", "Server Error, Please try again later.")
      }

    }

    const handleNewFieldChange = (e:any)=>{
      e.preventDefault()
      setNewField(e.target.value)
    }

    const handleTypeSelect = (option:string)=>{
      const restrictOption:fieldType = fieldTypeOptions.filter((curr_option)=> curr_option === option)[0]
      fieldTypeSet = restrictOption
      // console.log(fieldTypeSet)
    }

    const addField = async ()=>{
      
      setLoadAdd(true)
      let newFieldObj = getNewField()
      const data = await callAddFieldApi(props.id, newFieldObj);
      triggerToast("success", "New field added sucessfully!!!")
      setLoadAdd(false)
      newFieldObj.id = data.id
      dispatch({type:"add_field", field:newFieldObj})

    }

    const removeField:(id:number)=>void = async (id)=>{
      setLoadRemove(true)
      dispatch({type:"remove_field", id:id})
      try
      {
        await deleteFormField(props.id, id)
        triggerToast("info", "Form field removed")
      }
      catch(error)
      {
        console.log(error)
        triggerToast("error", "Server Error, Please try again later.")
      }
      setLoadRemove(false)
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
        case "dropdown":
          return (<DropDownEditView key={field.id} label={field.label} id={field.id.toString()} handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} value={field.label} options={field.options} handleAddOptionCB={(option, id)=>dispatch({type:"add_option", option:option, id:id})} handleClickCB={()=>removeField(field.id)}/>)
        
        case "textArea":
          return (<FormField key={field.id} label={field.label} type="text" handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} value={field.label} id={field.id.toString()} handleClickCB={()=>removeField(field.id)} focus={false}/>)
        
        case "radio":
          return (<RadioEditView key={field.id} id={field.id.toString()} handleClickCB={()=>removeField(field.id)} options={field.options} handleAddOptionCB={(option, id)=>dispatch({type:"add_option", option:option, id:id})}/>)
        
        case "multiselect":
          return (<MultiSelectEditView key={field.id} id={field.id.toString()} label={field.label} handleClickCB={()=>removeField(field.id)} options={field.options} value={field.label} handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} handleAddOptionCB={(option, id)=>dispatch({type:"add_option", option:option, id:id})}/>)  
        
        default:
          return (<FormField key={field.id} label={field.label} type="text" handleChangeCB={(e)=>dispatch({type:"label_change", id:e.target.id, label:e.target.value})} value={field.label} id={field.id.toString()} handleClickCB={()=>removeField(field.id)} focus={false}/>)
      }
    }

    return (
        
          <Appear className="mt-5 p-4 py-10 px-10 mx-auto max-h-full bg-white shadow-lg rounded-xl overflow-auto">
    
            <Header title="Welcome to #react-typescript with #tailwindcss "/>
            {loading || loadRemove?
              <div className="flex flex-row justify-center mt-3 mb-3"> 
                <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              :
              <>
              <div className="flex flex-col items-center mt-5 mb-5">

                <div className="mb-3">
                  <FormField label="Form Title" type="text" handleChangeCB={(e)=>dispatch({type:"update_title", title:e.target.value})} value={fields.title} id={String(new Date())} focus={true}/>
                </div>

                {fields.formFields.map((field, index)=>{

                  return (                   
                    <motion.div 
                    variants={childVariant(index*0.3)}
                    initial="hidden"
                    animate="visible" 
                    key={index} 
                    className="flex flex-col mb-5 bg-gray-200 shadow-lg rounded-xl w-[30rem] p-5 justify-center items-center gap-y-2">
                      {renderField(field)}
                    </motion.div>
                  )

                })}

                <div className="flex flex-col bg-blue-200 shadow-lg rounded-xl w-[30rem] p-5 justify-center items-center gap-y-2">
                  {/* Select type dropdown */}
                  {loadAdd?
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <>
                      <DropDownField label="Choose Type" options={fieldTypeOptions} handleSelectCB={handleTypeSelect}/>
                      <FormField label="Add Field" type="text" handleChangeCB={handleNewFieldChange} value={newField} id={String(new Date())} handleClickCB={addField} focus={false}/>
                    </>
                  }
                </div>
              </div> 
              
              <div className="flex space-x-2 justify-center">
                {loadSubmit
                ?
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                :
                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="inline-flex">
                  <button 
                  type="submit"
                  onClick={handleSubmit} 
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Submit
                  </button>
                </motion.div>
                }
                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="inline-flex">
                  <button
                  onClick={()=>dispatch({type:"clear"})} 
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Clear
                  </button>
                </motion.div>
              </div>
              
              <div className="flex space-x-2 justify-center mt-5">
                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="inline-flex">
                  <Link 
                  href="/list"
                  type="button" 
                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
                    Close Form
                  </Link>
                </motion.div>
              </div>
              </>
            }
    
          </Appear>
        
      );
}