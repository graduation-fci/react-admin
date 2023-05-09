import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaList, FaChartBar, FaCapsules } from 'react-icons/fa';
import './New.css';
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

const New = () => {
  let navigate = useNavigate();
  const [activeDiv, setActiveDiv] = useState(0);



  const handleSetActiveDiv = (divNumber) => {
    setActiveDiv(divNumber);
  };

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
            <button onClick={() => handleSetActiveDiv(1)} style={{ padding: '0.5rem' }}>
              <FaCapsules style={{ marginRight: '0.5rem' }} />
              Drugs
            </button>
          </li>

          <li>
            <button onClick={() => handleSetActiveDiv(2)} style={{ padding: '0.5rem' }}>
              <FaList style={{ marginRight: '0.5rem' }} />
              Categories
            </button>
          </li>
          <li>
            <button   onClick={() => handleSetActiveDiv(5)} style={{ padding: '0.5rem' }}>
              <UilPackage style={{ marginRight: '0.5rem' }} />
              Products
            </button>
          </li>
          <li>
            <button   onClick={() => handleSetActiveDiv(7)}  style={{ padding: '0.5rem' }}>
            <UilShoppingCartAlt style={{ marginRight: '0.5rem' }} />
               Orders
              </button>
             </li>
          <li>
            <button style={{ padding: '0.5rem' }}>
              <UilEstate style={{ marginRight: '0.5rem' }} />
              Dashboard
            </button>
          </li>
          <li>
            <button style={{ padding: '0.5rem' }}>
              <UilUsersAlt style={{ marginRight: '0.5rem' }} />
              Customers
            </button>
          </li>
         
          <li>
            <button style={{ padding: '0.5rem' }}>
              <UilSignOutAlt style={{ marginRight: '0.5rem' }} />
            </button>
          </li>
        </ul>
      </div>

      <div className="content">
        <div>
          <div style={{ display: activeDiv === 1 ? 'block' : 'none' }}>
      
             <br />
            <Home prop={ ()=>handleSetActiveDiv(3)} />
          </div>
          <div style={{ display: activeDiv === 3 ? 'block' : 'none' }}>
            <Medicine />
          </div>
        </div>

        <div style={{ display: activeDiv === 2 ? 'block' : 'none' }}>
      
           <Category1 prop={()=>handleSetActiveDiv(4)} />
          </div>
          <div style={{ display: activeDiv === 4 ? 'block' : 'none' }}>
            <Category />
          </div>
          <div style={{ display: activeDiv === 5 ? 'block' : 'none' }}>
         
            <Products1 prop={()=>handleSetActiveDiv(6)} />
          </div>
          <div style={{ display: activeDiv === 6 ? 'block' : 'none' }}>
            <Products/>
          </div>
          <div style={{ display: activeDiv === 7 ? 'block' : 'none' }}>
            <Orders />
          </div>
        </div>
      </div>
   
  );
};

export default New;