import React from 'react'
//import './Admin.css'
import SideBar from './../SideBar/SideBar';
import MainDash from '../MainDash/MainDash';
export default function Admin() {
  return (
    <>
    <div className='Admin' >
        <div className='AdminGlass'>
        <SideBar/> 
        <MainDash/>
        </div>
    </div>
    </>
  )
}
