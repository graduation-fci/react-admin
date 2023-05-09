import React ,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../imgs/logo.png'

//import './SideBar.css'
import { SidebarData } from '../../../Data/Data'
import {UilSignOutAlt} from '@iconscout/react-unicons'
export default function SideBar() {
  const[selected,setSelected]=useState(0)
  return (
    
      <div className="Sidebar">
        <div className="logo">
          <img src= {logo} alt=''/>
          <span> 
            med<span>ic</span>ine
          </span>
        </div>
        <div className="menu">
          {SidebarData.map((item,index)=>{
            return(
              <div className={selected===index?'menuItem active':'menuItem'}
              key={index}
              onClick={()=>setSelected(index)}
              >
                <item.icon/>
                <span>
                  {item.heading}
                </span>
              </div>
            )

          })}
         <div className="menuItem">
          <UilSignOutAlt/>
         </div>
        </div>
      </div>
    
  )
}
