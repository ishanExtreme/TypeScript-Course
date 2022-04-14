import { FormApi, FormFieldApi, formSubmission, PaginationParams } from "../types/apis";
import { formField } from "../types/form";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/"

type RequestMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'

const request = async (endpoint: string, method:RequestMethod = 'GET', data:any = {}, returnData:boolean = true, anonymousAccess:boolean = false)=>{

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
    // const auth = "BASIC " + window.btoa("extreme:Ishan@2605");

    // Token Based Authentication
    const token = localStorage.getItem("token");
    let auth = token ? "Token " + token : "";

    if(anonymousAccess && auth === "")
        auth = "BASIC " + window.btoa("extreme:Ishan@2605");


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
        if(returnData)
        {
            const json = await response.json();
            return json;
        }
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

export const getFormList = (pageParams:PaginationParams)=>{
    return request('forms/', 'GET', pageParams)
}

export const deleteFormApi = (id:number)=>{
    return request(`forms/${id}`, 'DELETE', {}, false)
}

export const getForm = (id:number)=>{
    return request(`forms/${id}`, 'GET', {})
}

export const getFormAnonymous = (id:number)=>{
    return request(`forms/${id}`, 'GET', {}, true, true)
}

export const getFormFields = (id:number)=>{
    return request(`forms/${id}/fields`, 'GET', {})
}

export const changeForm = (id:number, form:FormApi)=>{
    return request(`forms/${id}`, 'PUT', form)
}

export const addFormField = (id:number, formField:any)=>{
    
    return request(`forms/${id}/fields/`, 'POST', formField)
}

export const deleteFormField = (form_id:number, field_id:number)=>{
    return request (`forms/${form_id}/fields/${field_id}`, 'DELETE', {}, false)
}

export const changeFormField = (form_id:number, field_id:number, formField:any)=>{
    return request (`forms/${form_id}/fields/${field_id}`, 'PUT', formField, false)
}

export const getFormFieldsPaginated = (id:number, pageParams:PaginationParams)=>{
    return request(`forms/${id}/fields`, 'GET', pageParams, true, true)
}

export const makeSubmission = (form_id:number, submission:formSubmission)=>{
    return request(`forms/${form_id}/submission/`, 'POST', submission, true, true)
}