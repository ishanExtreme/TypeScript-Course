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
        <div className="ml-12">
          {formFields.map((field)=>(
            <FormField key={field.id} label={field.label} type={field.type}/>
          ))}
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
