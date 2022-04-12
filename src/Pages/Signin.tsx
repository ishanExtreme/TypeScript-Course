import React, { useState } from 'react'
import FormField from '../components/FormField'
import {Error, UserApi, validateUser} from '../types/apis'
import {login} from '../apis/apiTypeForm'
import { navigate } from 'raviger'

export default function Signin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<Error<UserApi>>({})

    const handleUsernameChange = (e:any)=>
    {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e:any)=>
    {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        const userApi:UserApi = {username:username, password: password}

        const validationError = validateUser(userApi)
        setError(validationError);

        // if user form is valid
        if(Object.keys(validationError).length === 0) {
            try {
                const data = await login(username, password)
                localStorage.setItem("token", data.token)
                navigate("/")
                window.location.reload()
            } 
            catch(error)
            {
                console.log(error)
            }
        }


    }



    return (
        <div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
            <form>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                <div className="space-y-4">
                    <h1 className="text-center text-2xl font-semibold text-gray-600">Welcome Back!!!</h1>
                    <FormField id="1" label="Username" type="text" handleChangeCB={handleUsernameChange} value={username} focus={false}/>
                    <FormField id="2" label="Password" type="password" handleChangeCB={handlePasswordChange} value={password}  focus={false}/>
                    
                </div>
                <button onClick={handleSubmit} type="submit" className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">SignIn</button>
                
                {Object.keys(error).length !== 0 && <p className='text-red-500 text-center mt-10'>{error.password} <br/> {error.username}</p>}
                </div>
            </form>
            
        </div>
    );
}