import api from '../api/api'

export const create =  async(userdata)=>{
    const response = await api.post('/api/create',userdata);
    return response.data;
}