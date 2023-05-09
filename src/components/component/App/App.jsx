import React from 'react'
import { useTranslation} from "react-i18next";
import i18next from 'i18next';
import Home from '../Home/Home'
import Login from './../Login/Login';
import Register from './../Register/Register';
import { Route, Routes } from 'react-router-dom';
import Admin from '../Admin/Admin';
import Medicine from './../Medicine/Medicine';
import Category from './../Category/Category';
import New from './../New/New';








export default function App() {

  
  return(



    <React.Fragment>
    <div>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/medicine' element={<Medicine/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/new' element={<New/>}/>
     
      </Routes>
      
    </div>
    </React.Fragment>
   
  )
}
