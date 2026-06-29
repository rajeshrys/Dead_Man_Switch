import {create} from '../auth/apikey'
import { AuthContext } from '../context/authcontext'
import { useContext } from 'react'

const useapi =( )=>{

    const {loading,setloading}  = useContext(AuthContext)

    const handlecreateapi = async(userdata)=>{
        setloading(true)
        try {
            const response  = await create(userdata);
            return response
            
        } catch (error) {
            throw error 
            return {
                success: false,
                message: error.message
            }
        }
        finally{
            setloading(false)
        }
    }

    return [handlecreateapi]
}

export default useapi