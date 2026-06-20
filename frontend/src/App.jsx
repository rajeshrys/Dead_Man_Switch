import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Homepage from './components/pages/Hompage'
import Register from './components/pages/Register'
import Dashboard from './components/pages/Dashboard'
import LoginPage from './components/pages/LoginPage'
import Pricing from './components/pages/Pricing'
import Document from './components/pages/Document'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/document' element={<Document/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
        }/>
    </Routes>
  )
}

export default App
