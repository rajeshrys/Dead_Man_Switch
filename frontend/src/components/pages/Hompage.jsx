import React, { useContext,useEffect } from 'react'
import Navbar from './Navbar'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authcontext'
import {checkAuth} from '../../services/authservice'

const Hompage = () => {
  const { setactivetab,setdashboard } = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
try {
      checkAuth().then(result => {
          if(result){
            navigate("/dashboard");
            setdashboard(true)
        }

    });
} catch (error) {
  console.log(error.message)
}

}, [])
  
  return (
    <div className='min-h-screen w-full bg-white'>
      <Navbar />

      <main className='relative overflow-hidden'>
        {/* soft ambient backdrop — subtle, not a loud gradient blob */}
        <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/60 via-white to-white' />

        <div className='mx-auto flex max-w-6xl flex-col-reverse items-center gap-16 px-6 py-16 lg:flex-row lg:gap-12 lg:py-24'>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className='flex w-full max-w-xl flex-col items-center gap-7 text-center lg:items-start lg:text-left'
          >
            <span className='inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-indigo-500' />
              </span>
              All systems monitored, live
            </span>

            <h1 className='text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl'>
              <span className='text-indigo-600'>Cron Monitor System</span> is a reliable monitoring platform
            </h1>

            <h2 className='text-xl font-medium text-slate-700 sm:text-2xl'>
              Never miss a failed cron job again
            </h2>

            <p className='text-base leading-relaxed text-slate-500 sm:text-lg'>
              Monitor backups, scripts, scheduled tasks, and automated workflows with real-time heartbeat tracking. Get instant visibility into failures before they impact your systems.
            </p>

            <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
              <Link
                to='/register'
                onClick={() => setactivetab('Sign Up')}
                className='inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95 sm:w-48'
              >
                Get Started
              </Link>
              <Link
                to='/login'
                onClick={() => setactivetab('Sign In')}
                className='inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95 sm:w-48'
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className='w-full max-w-xl overflow-hidden rounded-2xl border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)]'
          >
            <img
              className='h-full w-full object-cover'
              src='https://img.site24x7static.com/images/cron-monitoring-how-it-works.png'
              alt='Cron job monitoring dashboard showing job status and heartbeat tracking'
            />
          </motion.div>

        </div>
      </main>
    </div>
  )
}

export default Hompage