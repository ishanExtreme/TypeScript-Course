import React from "react";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FormField from '../components/FormField'
import {FormApi, Error, validateForm} from '../types/apis'
import TextAreaField from '../components/TextAreaField'
import {createForm} from '../apis/apiTypeForm'
import { navigate } from "raviger";


export default function CreateForm(props:{
    open:boolean,
    toogleOpen:(open:boolean)=>void

}) {

    const cancelButtonRef = useRef(null)

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const [error, setError] = useState<Error<FormApi>>({})

    const handleTitleChange = (e:any)=>{
        setTitle(e.target.value)
    }

    const handleDescChange = (e:any)=>{
        setDesc(e.target.value)
    }

    const handleIsPublicChange = (e:any)=>{
        setIsPublic((initialVal)=>!initialVal)
    }

    const handleSubmit = async ()=>{
        const newForm:FormApi = {
            title: title,
            description: desc,
            is_public: isPublic
        }

        const validationError = validateForm(newForm)
        setError(validationError);

        // if user form is valid
        if(Object.keys(validationError).length === 0) {
            try {
                const data = await createForm(newForm)
                props.toogleOpen(false)
                navigate(`form/${data.id}`)
            } 
            catch(error)
            {
                console.log(error)
            }
        }
    }

    return (
        <Transition.Root show={props.open} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={()=>props.toogleOpen(false)}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
    
              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          Create New Form
                        </Dialog.Title>
                        <div className="mt-2">
                            <FormField id="1" focus={true} handleChangeCB={handleTitleChange} label="Title" type="text" value={title}  />
                            <br/>
                            <TextAreaField id="2" handleChangeCB={handleDescChange} label="Description" value={desc} />
                            <br/>
                            {/* Check Box */}
                            <div className="form-check">
                                {isPublic?
                                    <input key={1} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" onChange={handleIsPublicChange} value="" id="flexCheckDefault" checked/>
                                    :
                                    <input key={2} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" onChange={handleIsPublicChange} value="" id="flexCheckDefault"/>
                                }
                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                                    Public
                                </label>

                                {Object.keys(error).length !== 0 && <p className='text-red-500 text-center mt-10'>{error.title}</p>}
                            </div>
                            {/* Check Box End */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.toogleOpen(false)}
                      ref={cancelButtonRef}
                      
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleSubmit}
    
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )
}