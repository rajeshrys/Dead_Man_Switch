import api from "../api/api";


export const register = async(userdata)=>{
    const response = await api.post('/auth/register',userdata)
    return response.data
}

export const login = async(userdata)=>{
    const response = await api.post('/auth/login',userdata)
    return response.data
}

export const logout = async()=>{
    const response = await api.post('/auth/logout')
    return response.data
}
