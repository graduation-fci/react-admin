import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaPlus, FaTrash, FaEdit, FaList, FaChartBar, FaCapsules } from 'react-icons/fa';
import './New.css';
import { getMedicine } from '../GetDrug/GetDrug';
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
  UilMoneyWithdrawal,
  UilUsdSquare,
  UilShoppingCartAlt
} from '@iconscout/react-unicons';
import logo from '../../imgs/logo.png';
import { useNavigate } from 'react-router-dom';
import Medicine from './../Medicine/Medicine';
import Category from './../Category/Category';
import Home from './../Home/Home';
import Category1 from '../Category1/Category1';
import Products from './../Products/Products';
import Products1 from './../Products1/Products1';
import Orders from './../Orders/Orders';
import Dash from '../Dash/Dash';

import { CssBaseline,AppBar,Toolbar,List,Typography,Divider,
  ListItem,ListItemButton,ListItemIcon,ListItemText,
  InboxIcon,MailIcon,Drawer, 
} from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import { useEffect } from 'react';
import Users from '../Users/Users';




const New = () => {
  let navigate = useNavigate();
  const [activeDiv, setActiveDiv] = useState(0);
  const drawerWidth = 240;


  const handleSetActiveDiv = (divNumber) => {
    setActiveDiv(divNumber);
  };

  function handleClick(name) {
    const url = new URL(window.location.href);
    url.searchParams.set('', name);
    window.history.replaceState({}, '', url);
   
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const activeDivName = params.get('');
    switch (activeDivName) {
      case 'drugs':
        setActiveDiv(1);
        break;
      case 'categories':
        setActiveDiv(2);
        break;
      case 'products':
        setActiveDiv(5);
        break;
      case 'orders':
        setActiveDiv(7);
        break;
        case 'Users':
          setActiveDiv(8);
          break;
      default:
        setActiveDiv(0);
    }
  }, []);

  return ( 
    
    <div className="admin-panel">
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={logo} alt="" />
          <span>
            Tota<span>lC</span>are
          </span>
        </div>
      </div>
      <ul className="sidebar-menu">
      <li>
        <button onClick={() => { handleSetActiveDiv(1); handleClick('drugs'); }} style={{ padding: '0.5rem' }}>
          <FaCapsules style={{ marginRight: '0.5rem' }} />
          Drugs
        </button>
       
      </li>
        <li>
        <button onClick={() => {
  handleSetActiveDiv(2);
  handleClick('categories')
}} style={{ padding: '0.5rem' }}>
  <FaList style={{ marginRight: '0.5rem' }} />
  Categories
</button>
        </li>
        <li>
          <button onClick={() => {handleSetActiveDiv(5);handleClick('products')}} style={{ padding: '0.5rem' }}>
            <UilPackage style={{ marginRight: '0.5rem' }} />
            Products
          </button>
        </li>
        <li>
          <button onClick={() => {handleSetActiveDiv(7);handleClick('orders')}} style={{ padding: '0.5rem' }}>
            <UilShoppingCartAlt style={{ marginRight: '0.5rem' }} />
            Orders
          </button>
        </li>
        <li>
          <button onClick={() =>handleClick('dashBoard')} style={{ padding: '0.5rem' }}>
            <UilEstate style={{ marginRight: '0.5rem' }} />
            Dashboard
          </button>  
        </li>
        <li>
          <button  onClick={() => {handleSetActiveDiv(8);handleClick('Users')}} style={{ padding: '0.5rem' }}>
            <UilUsersAlt style={{ marginRight: '0.5rem' }} />
            Users
          </button>
        </li>  
        <li>
          <button style={{ padding: '0.5rem' }}>
            <UilSignOutAlt style={{ marginRight: '0.5rem' }} />
            Logout
          </button>
        </li>
      </ul>
  </div>
    <div className="content" style={{ marginTop: 0 }}>
      <div  className="content-container" style={{ display: activeDiv === 1 ? 'block' : 'none' }}>
        
       <Home prop={() => handleSetActiveDiv(3)} />
      </div>
      <div className="content-container" style={{ display: activeDiv === 3 ? 'block' : 'none' }}>
        <Medicine />
      </div>
      <div className="content-container" style={{ display: activeDiv === 2 ? 'block' : 'none' }}>
        <Category1 prop={() => handleSetActiveDiv(4)} />
      </div>
      <div className="content-container" style={{ display: activeDiv === 4 ? 'block' : 'none' }}>
        <Category />
      </div>
      <div className="content-container" style={{ display: activeDiv === 5 ? 'block' : 'none' }}>
        <Products1 prop={() => handleSetActiveDiv(6)} />
      </div>
      <div className="content-container" style={{ display: activeDiv === 6 ? 'block' : 'none' }}>
        <Products  />
      </div>
      <div className="content-container" style={{ display: activeDiv === 7 ? 'block' : 'none' }}>
        <Orders />
      </div>
      <div className="content-container" style={{ display: activeDiv === 8 ? 'block' : 'none' }}>
        <Users />
      </div>
    </div>
  </div>
      
   
  );
};

export default New;