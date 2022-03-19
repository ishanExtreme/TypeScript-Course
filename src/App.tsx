import React from 'react';
import { useState } from 'react';
import 'tw-elements';
import AppContainer from './AppContainer';
import FormField from './FormField';
import Header from './Header';

const formFields = [
  {id:1, label: "First Name", type: "text", value:""},
  {id:2, label: "Last Name", type: "text", value:""},
  {id:3, label: "Email", type: "email", value:""},
  {id:4, label: "Phone Number", type: "tel", value:""},
  {id:5, label: "Date of Birth", type: "date", value:""},
]

function App() {

  const [Fields, setFields] = useState(formFields)
  const [newField, setNewField] = useState("")

  const handleNewFieldChange = (e:any)=>{
    e.preventDefault()
    setNewField(e.target.value)
  }

  const addField = ()=>{
    setFields([
      ...Fields,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value:""
      },
    ])
  }

  const removeField = (id:number)=>{
    setFields(Fields.filter((field)=> field.id !== id))
  }

  const handleChange = (e:any)=>{
    e.preventDefault()
    console.log(e.target.id)
    console.log(e.target.value)
    setFields(Fields.map((field)=>{
      if(e.target.id === field.id.toString())
        field.value = e.target.value
      return field
    }))
  }

  const clearCB = ()=>{

    setFields(Fields.map((field)=>{
      field.value = ""
      return field
    }))

    setNewField("")

  }

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">

        <Header title="Welcome to #react-typescript with #tailwindcss "/>

        <div className="ml-12 mt-5 mb-5">

          {Fields.map((field)=>(
            <FormField key={field.id} label={field.label} type={field.type} handleChangeCB={handleChange} value={field.value} id={field.id.toString()} handleClickCB={()=>removeField(field.id)}/>
          ))}

          <FormField label="Add Field" type="text" handleChangeCB={handleNewFieldChange} value={newField} id={String(new Date())} handleClickCB={addField}/>
        </div> 
        
        <div className="flex space-x-2 justify-center">
          <button 
          type="submit" 
          className="inline-block px-6 py-2.5 
          bg-blue-600 
          text-white 
          font-medium text-xs 
          leading-tight 
          uppercase 
          rounded shadow-md 
          hover:bg-blue-700 
          hover:shadow-lg 
          focus:bg-blue-700 
          focus:shadow-lg 
          focus:outline-none 
          focus:ring-0 
          active:bg-blue-800 
          active:shadow-lg 
          transition 
          duration-150 ease-in-out">
            Submit
          </button>

          <button
          onClick={clearCB} 
          className="inline-block px-6 py-2.5 
          bg-blue-600 
          text-white 
          font-medium text-xs 
          leading-tight 
          uppercase 
          rounded shadow-md 
          hover:bg-blue-700 
          hover:shadow-lg 
          focus:bg-blue-700 
          focus:shadow-lg 
          focus:outline-none 
          focus:ring-0 
          active:bg-blue-800 
          active:shadow-lg 
          transition 
          duration-150 ease-in-out">
            Clear
          </button>
        </div>

      </div>
    </AppContainer>
  );
}

export default App;
