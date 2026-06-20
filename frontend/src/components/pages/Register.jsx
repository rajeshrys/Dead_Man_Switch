import {useState} from 'react'
import Navbar from './Navbar'
import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import api from '../../api/api'

const Register = () => {
  
  const [messages, setmessages] = useState('')
  const [error, seterror] = useState('')
  const [mess, setmess] = useState(false)
  const [task,settask] = useState({
  username: "",
  email: "",
  password: ""
})
const navigate = useNavigate()
  const [handleregister] = useAuth()

  const handlechange =(e)=>{
     settask({
      ...task,
      [e.target.name] : e.target.value
    })
  }
  const handlesubmit= async(e)=>{
    e.preventDefault()
    try {
      
      const response = await handleregister(task)
    if (response.message === 'User registration Successful') {
      setmess(true)
      setmessages(response.message);
      setTimeout(() => {
    navigate('/login');
    }, 1000);

    }  else if(response.message === 'User Already exists') {
      setmessages(response.message);
      setmess(false)
    }
    } catch (error) {
  seterror("Cannot connect to server");
    }


    setTimeout(()=>{
      setmessages("");
    },1000)
   settask({
    username: "",
    email: "",
    password: ""
   })
  }
  return (
    
    <div>
      <Navbar/>

      {messages && (
  <div className="flex items-center justify-center">
    <div className="sticky top-0 left-0 max-w-60 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)] h-15 flex items-center justify-center px-3 rounded-2xl">
      <h1 className={`text-xl ${mess ? "text-green-600" : "text-red-600"}`}>
        {messages}
      </h1>
    </div>
  </div>
)}

      
     <div className='w-full flex p-7 items-center justify-center'>
      <div className='flex min-w-120 min-h-120 flex-col rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)]  gap-12'>
        <div className='flex items-center justify-center'>
          <h1 className='text-3xl text-gray-600 font-bold py-2'>Welcome Back!</h1>
        </div>
        <form onSubmit={handlesubmit} className='flex flex-col items-center justify-center'>
          <div className='flex items-start pl-6 flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>Username</label>
<input
 name="username"
 value={task.username}
onChange={handlechange}
  className='mt-1.5 w-full min-w-84 h-12 px-4 rounded-lg border border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-purple-500/10'
  type="text"
  placeholder='Enter your username'
  required
/>
<label className='text-sm font-medium text-gray-700'>Email</label>
<input
 name="email"
value={task.email}
  onChange={handlechange}
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
  className='mt-1.5 w-full min-w-84 h-12 px-4 rounded-lg border border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-purple-500/10'
  type="text"
  placeholder='Enter your email'
  required
/>
<label className='text-sm font-medium text-gray-700'>Password</label>
<input
 name="password"
 value={task.password}
  onChange={handlechange}
  className='mt-1.5 w-full min-w-84 h-12 px-4 rounded-lg border border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-purple-500/10'
  type="password"
  placeholder='Enter your password'
  required
/>
{error && (
  <p className='text-red-600 text-center text-xl'>{error}</p>
)}
            <div className='flex items-center justify-center min-h-12 w-full'>
              <button 
              type='submit'
              className='text-xl mt-2 font-semibold text-white bg-red-500 rounded-2xl min-w-84 p-3 cursor-pointer hover:bg-red-300 active:scale-95 '>Submit</button>
            </div>
            <div className='flex flex-row gap-2 items-center justify-center w-full'><p>Already have an account</p><Link className='text-blue-500 underline' to='/login' >Login</Link></div>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Register
