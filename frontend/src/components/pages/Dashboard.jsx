import React, { useState,useRef, useEffect  } from 'react';
import Navbar from './Navbar';
import { NavigationType, useNavigationType } from 'react-router-dom';

const Dashboard = ()=>{
  const navigationtype = useNavigationType()
  useEffect(()=>{
    if(navigationtype ==='PUSH'){
      console.log('User came to login')
    }
  },[])
  return (
    <div>
      <Navbar/>
     Dashboard
    </div>
  )
}
export default Dashboard