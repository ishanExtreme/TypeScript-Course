import { FormApi } from "../types/apis";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/"

type RequestMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'

const request = async (endpoint: string, method:RequestMethod = 'GET', data:any = {})=>{

    let url;
    let payload;
    if(method == 'GET')
    {
        const requestParams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`:""
        url = `${API_BASE_URL}${endpoint}${requestParams}`
        payload = null
    } else {
        url = `${API_BASE_URL}${endpoint}`
        payload = data? JSON.stringify(data) : null;
    }

    // Basic Authentication
    // const auth = "BASIC" + window.btoa("extreme:Ishan@2605");

    // Token Based Authentication
    const token = localStorage.getItem("token");
    const auth = token ? "Token " + token : "";


    const response = await fetch(
        url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },

        body: (method !== 'GET') ? payload : null
        
    })

    if(response.ok) {
        const json = await response.json();
        return json;
    } else {
        const errorJson = await response.json()
        throw Error(errorJson);
    }
} 

export const login = (username: string, password: string)=> {
    return request('auth-token/', 'POST', {username, password})
}

export const me = () =>{
    return request('users/me/', 'GET', {})
}

export const createForm = (newForm:FormApi)=>{
    return request('forms/', 'POST', newForm)
}