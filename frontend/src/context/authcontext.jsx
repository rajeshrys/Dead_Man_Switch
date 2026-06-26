import { createContext, useState, useEffect } from "react";
import { checkAuth } from "../services/authservice";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(null)
    const [activetab, setactivetab] = useState("home")
    const [authChecked, setauthChecked] = useState(false)
    const[dashboard,setdashboard] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        checkAuth().then((data) => {
            if (data.authenticated && data.user) {
                setuser(data.user)
            }else{
                navigate("/")
            }
        }).finally(() => {
            setauthChecked(true)
        })
    }, [])

    return(
        <AuthContext.Provider value={{user,setuser,loading,setloading,activetab, setactivetab, authChecked ,dashboard,setdashboard}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
