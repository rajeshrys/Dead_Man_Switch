import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { NavigationType, useNavigationType } from 'react-router-dom';
import { MdOutlineMonitorHeart } from "react-icons/md";
import logo from '../../assets/logs.png';
import { IoMenu,IoClose } from "react-icons/io5";
import api from '../../api/api';
import { FaRegCopy } from "react-icons/fa";
import useapi from '../../hooks/useapi';


const Dashboard = () => {
  const navigationtype = useNavigationType();
  const [activetab, setactivetab] = useState('home');
  const [logs, setlogs] = useState(false);
  const [jobs, setjobs] = useState(false);
  const [setup, setsetup] = useState(false);
  const [sidebaropen, setsidebaropen] = useState(false);
  const [apikey, setapikey] = useState(false)
  const [isopen, setisopen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [expires, setexpires] = useState(false);
  const [selectedexpire, setselectedexpire] = useState('Select an option');
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const [submitclicked, setsubmitclicked] = useState(false)
  const [message, setmessage] = useState('')
  const [gotmess, setgotmess] = useState(false)
  const [resultapikey, setresultapikey] = useState('https://cronitor.link/p/380f02f38d9e4590a582fa77b40b6f98/important-heartbeat')
  const [copied, setcopied] = useState(false)
  const [task, settask] = useState({
      name: "",
      option: "",
      expire: ""
    });
    const [handlecreateapi] = useapi();

  const options = ['read', 'write', 'admin'];
  const expireoptions = ['1day','3days','7days','1week','3weeks','1month','3months'];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggelexpiresdown = () =>setexpires(!expires);


  const handlesubmit = async(e)=>{
    e.preventDefault()
    console.log(task);
    const response = await handlecreateapi(task);
    setresultapikey(response.apiKey);
    setmessage(response.message);
    setTimeout(() => {
      setgotmess(true)
    }, 1000);
    setsubmitclicked(true)
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    settask((prev)=>({
      ...prev,
      option: option,
    }))
    setIsOpen(false);
  };

// handles copies
  const handlecopy = async () => {
    await navigator.clipboard.writeText(resultapikey); 
  };



  const expiresoptionclick = (option)=>{
    setselectedexpire(option);
     settask((prev) => ({
    ...prev,
    expire: option,
  }));
    setexpires(false);
  }



  return (
    <div className='min-h-screen w-full font-sans bg-slate-50/50'>
      <Navbar />
      <div className='flex flex-row w-full'>

        {/* Side bar */}
        <aside className={`min-w-64 ${sidebaropen ? "translate-x-0" :"-translate-x-64"} fixed bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)] min-h-screen flex justify-center py-8 lg:translate-x-0 lg:static`}>
          <div className='flex flex-col gap-6 w-full px-4'>
            <div className='flex flex-row gap-2 '>
              <h1 className='font-bold text-2xl px-4 text-slate-800'>
              Cron-<span className='font-bold text-purple-700'>Monitor</span>
            </h1>
            <button onClick={()=>setsidebaropen(false)} className='text-2xl font-bold lg:hidden'><IoClose /></button>
            </div>

            <ul className="flex flex-col gap-2 items-center w-full">
              <li
                onClick={() => setactivetab("home")}
                className={`w-full text-center font-semibold text-lg py-2.5 rounded-xl cursor-pointer transition ${
                  activetab === "home"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Home
              </li>

              <li
                onClick={() => setactivetab("logs")}
                className={`w-full text-center font-semibold text-lg py-2.5 rounded-xl cursor-pointer transition ${
                  activetab === "logs"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Logs
              </li>

              <li
                onClick={() => setactivetab("jobs")}
                className={`w-full text-center font-semibold text-lg py-2.5 rounded-xl cursor-pointer transition ${
                  activetab === "jobs"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Jobs
              </li>

              <li
                onClick={() => setactivetab("setup")}
                className={`w-full text-center font-semibold text-lg py-2.5 rounded-xl cursor-pointer transition ${
                  activetab === "setup"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Setup
              </li>

            </ul>
          </div>
        </aside>

        {/* dashboard */}
        <main className='min-h-screen w-full px-8 py-8'>
          <button onClick={
           ()=>setsidebaropen(true)
          } className='lg:hidden active:scale-105 cursor-pointer text-4xl'><IoMenu 
           className='' /></button>
          {activetab === 'home' && (
            <div className="p-6">
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                Start monitoring <span className="text-purple-700">in minutes.</span>
              </h1>

              <p className="text-2xl font-semibold text-blue-600 mt-2">
                Create your first monitor to get started.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

                {/* Jobs */}
                <div onClick={() => setactivetab('jobs')} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer border border-slate-100">
                  <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center text-white text-3xl">
                    📋
                  </div>

                  <h2 className="text-3xl font-bold mt-6 text-slate-800">
                    Jobs
                  </h2>

                  <p className="text-slate-500 mt-4 text-lg">
                    Monitor cron jobs, scheduled tasks and queue workers.
                  </p>
                </div>


                {/* Logs */}
                <div onClick={() => setactivetab('logs')} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer border border-slate-100">
                  <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center text-white text-3xl">
                    <img src={logo} alt="" className="w-8 h-8 object-contain" />
                  </div>

                  <h2 className="text-3xl font-bold mt-6 text-slate-800">
                    Logs
                  </h2>

                  <p className="text-slate-500 mt-4 text-lg">
                    View execution history, failures and successful pings.
                  </p>
                </div>

                {/* Setup */}
                <div onClick={() => setactivetab('setup')} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer border border-slate-100">
                  <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center text-white text-3xl">
                    📜
                  </div>

                  <h2 className="text-3xl font-bold mt-6 text-slate-800">
                    Setup
                  </h2>

                  <p className="text-slate-500 mt-4 text-lg">
                    Cron setup is used to configure the schedule on which the monitoring job will run.
                  </p>
                </div>

              </div>
            </div>
          )}

          {activetab === "logs" && (
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6 text-slate-800">Execution Logs</h1>
              {logs ? (
                <div className='min-h-20 min-w-100'>

                </div>
              ) : (
                <div className='min-h-100 flex items-center border-2 border-dashed border-slate-200 rounded-2xl bg-white'>
                  <div className='h-full w-full flex justify-center py-20'>
                    <h1 className='text-5xl font-bold text-slate-400'>No <span className='text-purple-600'>Current</span> Logs</h1>
                  </div>
                </div>
              )}  </div>
          )}


          {activetab === "jobs" && (
            <div className="p-6">
              <div className='flex justify-between items-center flex-row mb-6'>
                <h1 className="text-3xl font-bold text-slate-800">Current Jobs</h1>
                <div className='flex flex-row gap-2'>
                  {jobs && (
                    <button onClick={() => setjobs(false)} className='bg-red-600 text-white lg:min-w-24 min-w-24 lg:py-2 rounded-xl active:scale-95 cursor-pointer sm:text-lg p-1 hover:bg-red-500 text-xl font-medium'>Back</button>
                    
                  )}
                  <button onClick={() => setjobs(true)} className='bg-purple-600 text-xl cursor-pointer rounded-xl active:scale-105 text-white px-4 py-2 flex gap-2 items-center justify-center font-medium hover:bg-purple-500 transition shadow-md '>Add Job <span className='text-2xl font-semibold'>+</span></button>
                </div>

              </div>
              {jobs ? (
                <div className='flex items-center mt-12 justify-center'>
                  <div className='lg:min-h-10 lg:min-w-280 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)] rounded-2xl min-h-100 w-200 '>
                  <div className='m-4 flex flex-row justify-between sm:flex flex-wrap'>

                    <h1 className='text-2xl font-bold text-purple-700'>Generate api key</h1>
                    <button onClick={()=>setapikey(true)} className='bg-purple-600 text-xl cursor-pointer rounded-xl active:scale-105 text-white px-4 py-2 flex gap-2 items-center justify-center font-medium hover:bg-purple-500 transition shadow-md'>Add Key <span className='text-2xl font-semibold'>+</span></button>
                    {apikey && (
                      <div className='fixed inset-0 flex items-center justify-center h-screen w-full bg-black/40 backdrop-blur-none'>
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex justify-center">
                    <div className='flex items-start gap-2 justify-center flex-col '>
                    <h2 className="text-xl font-bold mb-2">Your Content Here</h2>

                    {/* Name of the apikey */}
                      <label className='text-xl font-semibold '>Name :</label>
                      <input onChange={(e)=>settask((prev)=>({
                        ...prev,
                        name: e.target.value
                      }))} className='p-2 border rounded-xl w-60 border-gray-300 outline-none' type="text" placeholder='Enter Name' required/>

                      {/* Permissions of the apikey */}
                      <div style={{ position: 'relative', width: '240px' }}>
                        <label className='text-xl font-semibold'>Permissions :</label>
      {/* Dropdown Button */}
      <button className='border border-gray-300 p-2  rounded-xl w-60'
        onClick={toggleDropdown} 
        
      aria-required>
        {selectedOption} {isOpen ? '▲' : '▼'}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          border: '1px solid #ccc',
          background: '#fff',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          zIndex: 10
        }}>
          {options.map((option, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionClick(option)}
              style={{ padding: '10px', cursor: 'pointer' }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <div>

      </div>
                        </div>


                    {/* expires of the apikey */}
                      <div className='flex flex-col '>
                      <label className='text-xl font-semibold w-60 '>ExpiresIn :</label>
                        <div className='relative'>
                          <button  onClick={toggelexpiresdown} className='border border-gray-300 p-2  rounded-xl w-60  'aria-required>
                        {selectedexpire} {expires ? '▲' : '▼'}
                        </button>
                        <ul className="space-y-2">
                        {expires && (
                          <div className='absolute top-10 left-2 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)] overflow-x-auto'>
                            {expireoptions.map((option, index) => (
                            <li 
                              key={index} 
                              onClick={() => expiresoptionclick(option)}
                            className='list-none w-50 bg-white p-2'
                            >
                              {option}
                            </li>
                          ))}
                          </div>
                        )}
                        </ul>
                        </div>
                        <button onClick={(e)=>handlesubmit(e)} className='mt-3 text-white font-semibold cursor-pointer active:scale-100 bg-purple-700 p-3 rounded-xl w-60' >Submit</button>
                        {!gotmess && (
                          <p className='text-green-700 text-center mt-2 font-semibold'>{message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                    </div>
                    
                    )}

                    {submitclicked && (
                      <div className='fixed inset-0 flex items-center justify-center h-screen w-full bg-black/40 backdrop-blur-none'>
                      <div className='h-20 flex flex-wrap  items-center justify-center gap-2 p-2 bg-white rounded-2xl '>
                        <h1>{resultapikey}</h1>
                        <button onClick={()=>{handlecopy(),setcopied(!copied)}} className='active:scale-95 cursor-pointer text-xl'><FaRegCopy /></button>
                        {copied && (
                          <div className='flex items-center justify-center '>
                            <p className='text-lg text-green-700'>!Copied</p>
                          </div>
                        )}
                        <button onClick={()=>setsubmitclicked(false)} className='bg-red-500 p-2 rounded-xl text-white text-lg cursor-pointer active:scale-100'>Back</button>
                      </div>
                      
                      
                      </div>
                    )}
                    

                  </div>
                  </div>
                  
                </div>
              ) : (
                <div className='min-h-100 flex items-center border-2 border-dashed border-slate-200 rounded-2xl bg-white'>
                  <div className='h-full w-full flex justify-center py-20'>
                    <h1 className='text-5xl font-bold text-slate-400'>No <span className='text-purple-600'>Current</span> Jobs </h1>
                  </div>
                </div>
              )}

              
            </div>

            
          )}

          {activetab === "setup" && (
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6 text-slate-800">Setup</h1>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;