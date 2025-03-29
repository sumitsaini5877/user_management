import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginForm from './LoginForm'
import AllUsers from './AllUsers';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/' element={<AllUsers/>}/>
        </Route>
    </Routes>
  )
}

export default AppRoutes;