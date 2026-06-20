import { createContext, useState } from "react";

export const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(null)
    const [activetab, setactivetab] = useState("home")
    return(
        <AuthContext.Provider value={{user,setuser,loading,setloading,activetab, setactivetab}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider