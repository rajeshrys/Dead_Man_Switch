import React, { useState,useContext ,useEffect} from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authcontext'
import { NavLink  } from "react-router-dom";

const Navbar = () => {
  const [click, setclick] = useState(false)
  const logo = sessionStorage.getItem('logo')
  const [,,handlelogout] = useAuth()
  const {activetab, setactivetab} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleclick = async()=>{
    await handlelogout();
    sessionStorage.clear();
    navigate('/login');
  }
  const handlelogoclick = ()=>{
    setTimeout(() => {
      setclick(false)
        }, 2000);
        setclick(true)
  }


  return ( 
    <nav className='min-h-20 sticky bg-white/80 backdrop-blur-md  left-0 top-0 w-full bg-white/30 shadow-md py-2'>

        <div className='px-18 py-3 flex flex-row justify-between'>
          <h1 className='text-3xl font-bold '>Cron <span className='text-purple-700'>Monitor</span> System</h1>
        <ul className=" pl-6 flex items-center flex-row gap-7 relative ">
          <NavLink   onClick={() => setactivetab("home")}
          to='/'><li  className='relative font-semibold text-purple-700 cursor-pointer active:scale-95 hover:text-black'>Home</li></NavLink >
          { activetab === 'home' && (
            <div className='absolute left-3 bottom-1 h-0.5 min-w-18 bg-purple-700 '></div>
          )}
          <NavLink   onClick={() => setactivetab("pricing")}
          to='/pricing'><li className='relative font-semibold text-purple-700 cursor-pointer active:scale-95 hover:text-black'>Pricing</li></NavLink >
          { activetab === 'pricing' && (
            <span className='absolute left-22 bottom-1 h-0.5 min-w-18 bg-purple-600 '></span>
          )}
          <NavLink  
          to='/register'><li onClick={() => setactivetab("Sign Up")} className='relative  font-semibold text-purple-700 cursor-pointer active:scale-95 hover:text-black'>Sign Up</li></NavLink >
          { activetab === 'Sign Up' && (
            <span className='absolute left-42 bottom-1 h-0.5 min-w-18 bg-purple-600 '></span>
          )}
          <NavLink  onClick={() => setactivetab("Sign In")} 
          to='/login'><li className=' relative font-semibold text-purple-700  cursor-pointer active:scale-95 hover:text-black'>Sign In</li></NavLink >
          { activetab === 'Sign In' && (
            <span className='absolute left-62 bottom-1 h-0.5 min-w-18 bg-purple-600 '></span>
          )}
         
      
        <div
        onClick={handlelogoclick}
         className='w-10 relative bg-gray-200 h-10 rounded-full flex items-center justify-center cursor-pointer active:scale-95'>
         {logo ? ( <h1 className='text-xl text-center uppercase font-bold  '>{logo}</h1>):( <h1 className='text-xl text-center uppercase font-bold  '></h1>)}
        </div>
        {click && (
          <div onClick={handleclick} className='absolute bg-white h-12 min-w-28 flex items-center justify-center shadow-md top-15 right-14 cursor-pointer rounded-2xl active:scale-105 '><span className='text-red-600 text-lg font-semibold '>Logout</span></div> 
        )}        
        </ul>
       
        </div>
      </nav>
  )
}

export default Navbar
