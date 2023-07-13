import React from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom"
import Navbar from './component/navbar/Navbar'
import Home from './component/home/Home'
import Signup from './component/auth/Signup'
import Login from './component/auth/Login'
import Notes from './component/notes/Notes'
import Admin from './component/admin/Admin'
function Main() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Main
