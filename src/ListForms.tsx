import React, {useState, useEffect} from "react";
import AppContainer from "./AppContainer";
import Form from "./Form";
import PrevForm from "./PrevForm";


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

export default function ListForm(props:{homeButtonCB:()=>void}) {

    const [formList, setFormList] = useState<formData[]>([])
    const [currForm, setCurrForm] = useState<formData>()
    const [prevOn, setPrevOn] = useState<boolean>(false)

    const getLocalForms: ()=>formData[] = ()=>{
      const savedFormsJSON = localStorage.getItem("savedForms")
      return savedFormsJSON 
      ? JSON.parse(savedFormsJSON) 
      : []
    }

    const saveLocalForms = (localForms: formData[])=>{
        localStorage.setItem("savedForms", JSON.stringify(localForms))
    }

    const createNewForm = ()=>{

        const newForm = {
          id: Number(new Date()),
          title: "Untitled",
          formFields
        }

        setFormList([...formList, newForm])
        saveLocalForms([...formList, newForm])
    }

    const saveFormData = (currentForm: formData)=>{
        const localForms = getLocalForms();
        const updatedLocalForms = localForms.map((form)=>
          form.id === currentForm.id ? currentForm : form
        )
  
        saveLocalForms(updatedLocalForms)
    }

    useEffect(()=>{
        setFormList(getLocalForms())
    },[])

    const loadForm = (id:number)=>{
        setPrevOn(false)
        const currentForm = formList.filter((form)=> form.id === id)[0]
        setCurrForm(currentForm)
    }

    const closeForm = ()=>{
        setPrevOn(false)
        setCurrForm(undefined)
        setFormList(getLocalForms())
    }

    const deleteForm = (id:number)=>{
        const updatedFormList = formList.filter((form)=> id !== form.id)
        setFormList(updatedFormList)
        saveLocalForms(updatedFormList)
    }
    
    const prevForm = (id:number)=>{
        setPrevOn(true)
        const currentForm = formList.filter((form)=> form.id === id)[0]
        setCurrForm(currentForm)
    }

    return (
        <>
        {currForm?
            prevOn?<PrevForm closeFormCB={closeForm} id={currForm.id}/>
            :
            <Form closeFormCB={closeForm} id={currForm.id} saveFormDataCB={saveFormData}/>
            :
                <AppContainer>
                    <div className="p-4 mx-auto bg-white shadow-lg rounded-xl min-w-[50%] text-center">
                        <div className="py-3 px-6 border-b border-gray-300">
                            Your Saved Forms
                        </div>
                        <div className="p-6">

                        {formList.map((form)=>{
                            return (
                                    <div className="flex flex-row justify-center mb-3">         
                                        <p className="text-sky-500 text-center decoration-solid text-2xl mb-4 mr-2">
                                            {form.title}
                                        </p>

                                        <div className="grid ml-2 gap-1 grid-cols-3">
                                            <button onClick={()=>prevForm(form.id)} type="button" className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                                <img src="./images/icons/prev.png"/>
                                            </button>

                                            <button onClick={()=>loadForm(form.id)} type="button" className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                                <img src="./images/icons/edit.png"/>
                                            </button>

                                            <button onClick={()=>deleteForm(form.id)} type="button" className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                                <img src="./images/icons/del.png"/>
                                            </button>
                                        </div>
                                    </div>
                                    );
                                })}


                            

                            <button type="button" onClick={createNewForm} className="mt-5 inline-block  px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-green active:shadow-lg transition duration-150 ease-in-out">New Form</button>
                        </div>
                        <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                            <button onClick={props.homeButtonCB} type="button" className="inline-block  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Home</button>
                        </div>
                    
                    </div>
                </AppContainer>
            }
        </>
    );

}