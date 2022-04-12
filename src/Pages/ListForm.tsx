import React, {useState, useEffect} from "react";
import {useQueryParams, navigate, Link} from 'raviger'
import FormField from "../components/FormField";
import {formData, formField} from '../types/form'
import CreateForm from '../components/CreateForm'


const formFields: formField[] = [
    {kind:"text", id:1, label: "First Name", type: "text", value:""},
    {kind:"text", id:2, label: "Last Name", type: "text", value:""},
    {kind:"text", id:3, label: "Email", type: "email", value:""},
    {kind:"text", id:4, label: "Phone Number", type: "tel", value:""},
    {kind:"text", id:5, label: "Date of Birth", type: "date", value:""},
]

export default function ListForm() {

    const [{search}, setQuery] = useQueryParams();
    const [searchString, setSearchString] = useState<string>("");
    const [formList, setFormList] = useState<formData[]>([]);

    const [open, setOpen] = useState(false)
  

    const getLocalForms: ()=>formData[] = ()=>{
      const savedFormsJSON = localStorage.getItem("savedForms")
      return savedFormsJSON 
      ? JSON.parse(savedFormsJSON) 
      : []
    }

    const saveLocalForms = (localForms: formData[])=>{
        localStorage.setItem("savedForms", JSON.stringify(localForms))
    }

    const hanldeOpenToogle = (openVal:boolean)=>{
        setOpen(openVal)
    }

    const createNewForm = ()=>{
        
        hanldeOpenToogle(true)
        // const newForm = {
        //   id: Number(new Date()),
        //   title: "Untitled",
        //   formFields
        // }

        // setFormList([...formList, newForm])
        // saveLocalForms([...formList, newForm])
        // // redirect to new form
        // navigate(`form/${newForm.id}`);
    }

    useEffect(()=>{
        setFormList(getLocalForms())
    },[])


    const deleteForm = (id:number)=>{
        const updatedFormList = formList.filter((form)=> id !== form.id)
        setFormList(updatedFormList)
        saveLocalForms(updatedFormList)
    }
    

    const handleSearchChange = (e:any)=>{
        e.preventDefault()
        setSearchString(e.target.value)
    }

    return (
      
        
            <div className="p-4 max-h-full overflow-auto mx-auto bg-white shadow-lg rounded-xl min-w-[50%] text-center">
                
                <CreateForm open={open} toogleOpen={hanldeOpenToogle} />
                
                <div className="py-3 px-6 border-b border-gray-300">
                    Your Saved Forms
                </div>
                <div className="p-6">

                <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    setQuery({search:searchString})
                }} 
                className="flex justify-center mb-5">
                    <FormField label="Search" type="text" handleChangeCB={handleSearchChange} value={searchString} id="1" focus={true}/>
                </form>

                {formList.
                filter((form)=>
                    form.title.toLowerCase().includes(search?.toLocaleLowerCase() || "")
                    )
                    .map((form, index)=>{
                    return (
                            <div key={index} className="flex flex-row justify-center mb-3">         
                                <p className="text-sky-500 text-center decoration-solid text-2xl mb-4 mr-2">
                                    {form.title}
                                </p>

                                <div className="grid ml-2 gap-1 grid-cols-3">
                                    <Link href={`/preview/${form.id}`} className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                        <img src="./images/icons/prev.png"/>
                                    </Link>

                                    <Link href={`/form/${form.id}`} type="button" className="inline-block shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                        <img src="./images/icons/edit.png"/>
                                    </Link>

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
                    <Link href="/" className="inline-block  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Home</Link>
                </div>
            
            </div>
        
            
        
    );

}