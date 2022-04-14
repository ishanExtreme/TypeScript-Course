import React, { useEffect, useState } from 'react';
import 'tw-elements';
import AppRouter from './routes/AppRouter';
import {me} from './apis/apiTypeForm'
import {user} from './types/user'
import Navbar from './components/Navbar'


const getCurrentUser = async (setCurrentUser: (user:user)=>void) =>{
  const currtUser = await me();
  if(currtUser.username === "")
    setCurrentUser(null)
  else
    setCurrentUser(currtUser);

}

function App() {

  const [currentUser, setCurrentUser] = useState<user>(null);

  useEffect(()=>{
    getCurrentUser(setCurrentUser);
  },[])


  return (
    
    <AppRouter currentUser={currentUser}/>
    
  );
}

export default App;
