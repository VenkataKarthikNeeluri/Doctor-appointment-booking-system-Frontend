import React, { useContext} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PrivateRouter from './PrivateRoute/PrivateRouter'
import { AuthContext } from './Context/AuthContext'

import Menu from './component/Default/Menu'
import Home from './component/Default/Home'
import Services from './component/Default/Services'
import Contact from './component/Default/Contact'
import Register from './component/Auth/Register'
import Login from './component/Auth/Login'
import Pnf from './component/Default/Pnf'

import AdminDashboard from './component/Admin/AdminDashboard'
import DoctorDashboard from './component/Doctor/DoctorDashboard'
import UserDashboard from './component/User/UserDashboard'
import About from './component/Default/About'
import AdminProfile from './component/Admin/AdminProfile'
import UserProfile from './component/User/UserProfile'
import DoctorProfile from './component/Doctor/DoctorProfile'

import { ToastContainer } from 'react-toastify'



function App() {
  const context = useContext(AuthContext)
  const token = context.token
  const isUser = context.isUser
  const isAdmin = context.isAdmin
  const isDoctor = context.isDoctor
  return (
    <Router>
      <Menu/>
      <ToastContainer autoClose={3000} position={'top-right'}/>
        <Routes>
          <Route element={<PrivateRouter/>} >
            <Route path={`/`} element={<Home/>} />
            <Route path={`/about`} element={<About/>} />
            {
              isUser && token ? (
                <React.Fragment>
                    <Route path={`/services`} element={<Services/>} />
                    <Route path={`/user/dashboard`} element={<UserDashboard/>} />
                    <Route path={`/user/profile`} element={<UserProfile/>} />
                </React.Fragment>
              ) : null
            }

            {
              isAdmin && token ? (
                <React.Fragment>
                    <Route path={`/admin/dashboard`} element={<AdminDashboard/>} />
                    <Route path={`/admin/profile`} element={<AdminProfile/>} />
                </React.Fragment>
              ) : null
            }

            {
              isDoctor && token ? (
                <React.Fragment>
                     <Route path={`/doctor/dashboard`} element={<DoctorDashboard/>} />
                     <Route path={`/doctor/profile`} element={<DoctorProfile/>} />
                </React.Fragment>
              ) : null
            }
          
            
            
            
          </Route>
           
            <Route path={`/contact`} element={<Contact/>} />
            <Route path={`/register`} element={<Register/>} />
            <Route path={`/login`} element={token ? <Navigate to={`/`}/> : <Login/>} />
            {/* <Route path={`/admin/login`} element={<AdminLogin/>} /> */}
            
            <Route path={`/*`} element={<Pnf/>} />
        </Routes>
    </Router>
  )
}

export default App
