import {isAxiosError} from 'axios'
import api from '../Config/axios'
import type { ProfileForm, User } from '../Types'

export async function getUser() {
    
    try{
        const {data} = await api.get<User>('/user')
        return data

    }catch (error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function UpdateProfile(formData: ProfileForm) {
    
    try{
        const {data} = await api.patch<string>('/user', formData)
        return data

    }catch (error){
        if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}