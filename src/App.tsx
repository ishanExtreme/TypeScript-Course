import React from 'react';
import { useState } from 'react';
import 'tw-elements';
import Form from './Form';
import Home from './Home';
import ListForm from './ListForms';


function App() {

  const [openForm, setOpenForm] = useState(false)

  const toogleForm = ()=>{
    setOpenForm(!openForm)
  }

  return (
    <>
      {openForm?<ListForm homeButtonCB={toogleForm}/>:<Home openFormCB={toogleForm}/>}
    </>
  );
}

export default App;
