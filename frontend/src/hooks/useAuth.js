import { useContext } from "react";
import {AuthContext} from '../context/authcontext.jsx'
import {register,login,logout} from '../auth/authapi'
import { useNavigate } from "react-router-dom";

const useAuth =()=>{
    
    const {user,setuser,loading,setloading} =  useContext(AuthContext)
    const navigate = useNavigate()

    const handleregister = async(userdata)=>{
        setloading(true)
        try {
            const response = await register(userdata)
            if (response.user) {
                setuser(response.user)
            }
            return response
        } catch (error) {
            console.log(error)
              throw error;
            return {
                success: false,
                message: error.response?.data?.message || error.message
            }
        }
        finally{
            setloading(false)
        }
    }

    const handlelogin  = async(userdata)=>{
        setloading(true)
        try {
            const response = await login(userdata)
            if (response.user) {
                setuser(response.user)
            }
            return response
        } catch (error) {
            console.log(error)
              throw error;
            return {
                success: false,
                message: error.response?.data?.message || error.message
            }
        }
        finally{
            setloading(false)
        }      
    }

        const handlelogout  = async()=>{
        setloading(true)
        try {
            const response = await logout()
            setuser(null)
            return response
        } catch (error) {
            throw error
            return {
                success: false,
                message: error.response?.data?.message || error.message
            }
        }
        finally{
            setloading(false)
        }      
    }

    return [handleregister,handlelogin,handlelogout]

}

export default useAuth
