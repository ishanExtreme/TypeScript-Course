export type UserApi = {
    username: string,
    password: string
}

export type FormApi = {
    id?:number,
    title: string,
    description?: string,
    is_public?: boolean
}

export type Error<T> = Partial<Record<keyof T, string>>

export const validateUser = (user:UserApi) => {
    const errors: Error<UserApi> = {}

    if(user.username.length < 1) {
        errors.username = "Username is Required"
    }
    if(user.password.length < 1) {
        errors.password = "Password is Required"
    }

    return errors;
}

export const validateForm = (form:FormApi) => {
    const errors: Error<FormApi> = {}

    if(form.title.length < 1) {
        errors.title = "Title is Required"
    }
    
    if(form.title.length > 100) {
        errors.title = "Title must be less than 100 characters"
    }

    return errors;
}
