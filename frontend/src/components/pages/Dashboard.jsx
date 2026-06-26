import React, { useState,useRef, useEffect  } from 'react';
import Navbar from './Navbar';
import { NavigationType, useNavigationType } from 'react-router-dom';
import { MdOutlineMonitorHeart } from "react-icons/md"

const Dashboard = ()=>{
  const navigationtype = useNavigationType()
  const [activetab, setactivetab] = useState('home');
  useEffect(()=>{
    if(navigationtype ==='PUSH'){
      console.log('User came to login')
    }
  },[])
  return (
    <div className='min-h-screen w-full'>
      <Navbar/>
     <div className='flex flex-row w-full'>

      {/* Side bar */}
      <aside className='w-64  shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)] min-h-163 flex justify-center '>
      <div className='flex flex-col gap-6'>
        <h1 className='font-bold text-3xl'>Cron- <span className='font-bold text-purple-700'>Montior</span></h1>
        
      <ul className="flex flex-col gap-3 items-center">
  <li
    onClick={() => setactivetab("home")}
    className={`min-w-60 text-center font-semibold text-xl py-2 rounded-xl cursor-pointer ${
      activetab === "home"
        ? "bg-gray-200 hover:bg-gray-200"
        : "bg-white hover:bg-gray-200"
    }`}
  >
    Home
  </li>

  <li
    onClick={() => setactivetab("logs")}
    className={`min-w-60 text-center font-semibold text-xl py-2 rounded-xl cursor-pointer  ${
      activetab === "logs"
        ? "bg-gray-200 hover:bg-gray-200"
        : "bg-white hover:bg-gray-200"
    }`}
  >
    Logs
  </li>

  <li
    onClick={() => setactivetab("jobs")}
    className={`min-w-60 text-center font-semibold text-xl py-2 rounded-xl cursor-pointer  ${
      activetab === "jobs"
        ? "bg-gray-200 hover:bg-gray-200"
        : "bg-white hover:bg-gray-200"
    }`}
  >
    Jobs
  </li>
</ul>
      </div>
     </aside>

     {/* dashboard */}
     <main className='min-h-screen w-full px-5 py-5'>
      <div className="p-6">
  <h1 className="text-5xl font-bold">
    Start monitoring <span className="text-purple-700">in minutes.</span>
  </h1>

  <p className="text-2xl font-semibold text-blue-600 mt-2">
    Create your first monitor to get started.
  </p>

  <div className="grid grid-cols-3 gap-8 mt-10">

    {/* Jobs */}
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer border">
      <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center text-white text-3xl">
        📋
      </div>

      <h2 className="text-3xl font-bold mt-6">
        Jobs
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
        Monitor cron jobs, scheduled tasks and queue workers.
      </p>
    </div>

    {/* Heartbeats */}
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer border">
      <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white text-3xl">
        ❤️
      </div>

      <h2 className="text-3xl font-bold mt-6">
        Heartbeats
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
        Receive heartbeat pings from your cron jobs and servers.
      </p>
    </div>

    {/* Logs */}
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition cursor-pointer border">
      <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center text-white text-3xl">
        📜
      </div>

      <h2 className="text-3xl font-bold mt-6">
        Logs
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
        View execution history, failures and successful pings.
      </p>
    </div>

  </div>
</div>

      {activetab === "logs" && (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Execution Logs</h1>

    <div className="overflow-hidden rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Time</th>
            <th className="p-4">Job</th>
            <th className="p-4">Status</th>
            <th className="p-4">Message</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">
            <td className="p-4">10:45 AM</td>
            <td className="p-4">Database Backup</td>
            <td className="p-4 text-green-600 font-semibold">Success</td>
            <td className="p-4">Ping received successfully.</td>
          </tr>

          <tr className="border-t">
            <td className="p-4">10:30 AM</td>
            <td className="p-4">Email Service</td>
            <td className="p-4 text-red-600 font-semibold">Failed</td>
            <td className="p-4">Expected heartbeat not received.</td>
          </tr>

          <tr className="border-t">
            <td className="p-4">10:20 AM</td>
            <td className="p-4">Report Generator</td>
            <td className="p-4 text-green-600 font-semibold">Success</td>
            <td className="p-4">Job completed successfully.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}


      {activetab === "jobs" && (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Jobs</h1>

      <button className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg font-semibold">
        + Add Job
      </button>
    </div>

    <div className="overflow-hidden rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06)] bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Job Name</th>
            <th className="p-4">Schedule</th>
            <th className="p-4">Status</th>
            <th className="p-4">Last Ping</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">
            <td className="p-4">Database Backup</td>
            <td className="p-4">Every 5 min</td>
            <td className="p-4 text-green-600 font-semibold">Healthy</td>
            <td className="p-4">2 min ago</td>
            <td className="p-4">
              <button className="text-blue-600">View</button>
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-4">Email Service</td>
            <td className="p-4">Every 10 min</td>
            <td className="p-4 text-red-600 font-semibold">Missed</td>
            <td className="p-4">18 min ago</td>
            <td className="p-4">
              <button className="text-blue-600">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}
     </main>
     </div>
    </div>
  )
}
export default Dashboard