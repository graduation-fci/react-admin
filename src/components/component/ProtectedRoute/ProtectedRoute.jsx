import React from 'react'
import { Route , Redirect } from 'react-router-dom'
import Home from '../Home/Home'

export default function ProtectedRoute() {

if(localStorage.getItem('userToken')){
  return (<Route path='/home'><Home/></Route>)
}
else{
    return Redirect("/login");
}
}
