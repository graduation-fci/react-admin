import React, { useState } from 'react'
import axios, { Axios } from 'axios'
import URL from '../URL/URL'
      
export const getMedicine = async () => {
    let token = localStorage.getItem("userToken");
    let response = await axios.get(URL + 'medicine/categories/', {
      headers: {
        Authorization: 'JWT ' + token
      }
    });
    return {
      count: response.data.count / 10,
      medicines: response.data.results
    };
  };
      
   
    
