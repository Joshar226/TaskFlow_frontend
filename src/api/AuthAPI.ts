import { isAxiosError } from "axios";
import { ConfirmToken, NewPasswordFormType, RequestConfirmationCodeForm, ResetPasswordForm, User, UserLoginForm, UserRegistrationForm, userSchema } from "../types";
import api from "../lib/axios";

export async function createAccount(formData : UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url, formData)
        return data 
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function login(formData : UserLoginForm) {
    try {
        const url = 'auth/login'
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token : ConfirmToken) {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post<string>(url, token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function resetPassword (formData : ResetPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData : ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updatePasswordWithToken({formData, token} : {formData: NewPasswordFormType, token : ConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function requestConfirmationCode(formData : RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const url = '/auth/user'
        const {data} = await api.get<User>(url)
        const response = userSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

