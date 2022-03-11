import React from 'react';
import 'tw-elements';
import AppContainer from './AppContainer';
import FormField from './FormField';
import Header from './Header';

const formFields = [
  {id:1, label: "First Name", type: "text"},
  {id:2, label: "Last Name", type: "text"},
  {id:3, label: "Email", type: "email"},
  {id:4, label: "Phone Number", type: "tel"},
  {id:5, label: "Date of Birth", type: "date"},
]

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">

        <Header title="Welcome to #react-typescript with #tailwindcss "/>

        <div className="ml-12 mt-5 mb-5">

          {formFields.map((field)=>(
            <FormField key={field.id} label={field.label} type={field.type}/>
          ))}

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
        </div>

      </div>
    </AppContainer>
  );
}

export default App;
