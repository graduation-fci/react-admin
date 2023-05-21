import axios from 'axios';
import Joi from 'joi';
import React , {useEffect} from 'react'

import 
{
  SelectChangeEvent ,
  Link,
  Menu, 
  MenuItem, 
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';





import TextField from '@mui/material/TextField';



import { useTranslation} from "react-i18next";
import i18next from 'i18next';
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import"./Register.css"
import { FaGlobe } from './../../../../node_modules/react-icons/fa/index.esm';
import Cookies from 'js-cookie';
import log from '../../imgs/log.jpg';
import Login from './../Login/Login';
const languages=[
  {
    code:'en',
    name:'English',
    country_code:'gb'
  },
  {
  code:'ar',
  name:'العربيه',
  country_code:'sa',
  dir:'rtl'

},
]  


export default function Register() {
  const currentLanguageCode=Cookies.get('i18next') || 'en'
  const currentLanguage=languages.find((l)=>l.code ===currentLanguageCode)

  const { t }=useTranslation()
  
  let[errorList,setErrorList]=useState([]);
   let[error,setError]=useState('');
  let navigate = useNavigate()
  let[loading,setLoading]=useState(false);

  let [user,setUser]=useState({
     username:'',first_name:'',last_name:'',email:'',password:'',profile_type:'STD'
  });







  function getUser(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
   console.log(myUser);
  }


async function formSubmit(e){
    e.preventDefault();
 

 
   let validationResponse =  validateRegisterForm();
   console.log(validationResponse)
   if(validationResponse.error){
    setErrorList(validationResponse.error.details)
   }
   else
   {
    const response= await axios.post("http://localhost:8000/auth/users/", user);
    if(response.status==200){
      navigate('/login')
    }
    else{
    //setError(response.data.message)
      ////
    }
   }
   
}

function validateRegisterForm(){
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(10).required(),
    last_name: Joi.string().min(3).max(10).required(),
    username: Joi.string().min(3).max(30).required(), 
    password: Joi.string()
    .pattern(new RegExp('^[A-Z]+[a-z]+[a-zA-Z0-9]*$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password should start with a capital letter and have 3-9 lowercase letters',
    }),
    email:Joi.string().required().email({ tlds: { allow: false } }),
    //profile_type:Joi.required(),
  
  
  });

  return schema.validate(user ,{abortEarly:false});
}
function getError(fieldName) {
  const error = errorList.find((err) => err.path.includes(fieldName));
  return error ? error.message : '';
  }

useEffect( ()=>{
  document.body.dir=currentLanguage.dir || 'ltr'
},[currentLanguage])


  return (
    
    <>

 



   <div className='row '>
        <div className='col-md-6'>
            <div className='leftSide d-flex justify-content-center align-items-center '>

   

    <form onSubmit={formSubmit}>
    <h4 >{t("Create Account")} </h4>

 <br/>

 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <TextField
      id="username"
      label="Username"
      variant="outlined"
      autoFocus
      InputProps={{ style: { height: '50px' } }}
      style={{ marginBottom: '16px', width: '100%' }}
      onChange={getUser}
      type="text"
      placeholder={t('Enter Your username')}
      name="username"
      error={Boolean(getError('username'))}
      helperText={getError('username')}
    />

    <TextField
      id="first_name"
      label="First Name"
      variant="outlined"
      InputProps={{ style: { height: '50px' } }}
      style={{ marginBottom: '16px', width: '100%' }}
      onChange={getUser}
      type="text"
      placeholder={t('Enter Your first_name')}
      name="first_name"
      error={Boolean(getError('first_name'))}
      helperText={getError('first_name')}
    />


<TextField
          id="last_name"
          label="Last Name"
          variant="outlined"
          InputProps={{ style: { height: '50px' } }}
          style={{ marginBottom: '16px', width: '100%' }}
          onChange={getUser}
          type="text"
          placeholder={t('Enter Your last_name')}
          name="last_name"
          error={Boolean(getError('last_name'))}
          helperText={getError('last_name')}
        />

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          InputProps={{ style: { height: '50px' } }}
          style={{ marginBottom: '16px', width: '100%' }}
          onChange={getUser}
          type="email"
          placeholder={t('Enter Your Email')}
          name="email"
          error={Boolean(getError('email'))}
          helperText={getError('email')}/>
 
   
   <TextField  id="password"
       label="Password"
        variant="outlined"   
        InputProps={{
          style: {
            height: '50px' // Set to your preferred height
          }
        }} style={{ marginBottom: '16px', width: '100%'}}
        onChange={getUser} type='password' placeholder={t('password')}   name='password'
        error={Boolean(getError('password'))}
          helperText={getError('password')}
        />







    </Box>
  
  
 

  


<Box  m={2} >
        <Button type='submit' variant="contained" color="primary" style={{width:'100%'}} >{t("Sign up")}</Button>
         </Box>


 
         <Typography   variant="h6" style={{width:'100%',textAlign:'center',justifyContent:'center'}}   >
           {t("Don't hava an account?")} <Link href="/login" underline="none">
         {t("sign in")} 
          </Link>  
          </Typography>
</form>
</div>
</div>
    <br/>
    <div className="col-md-6">
      
    <div className="container">
     <div className="d-flex justify-content-end">
     <div className="dropdown">
     <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
       <FaGlobe className='icon'/> 
    </button>
         <ul className="dropdown-menu">
           {languages.map(({code,name,country_code}) =>(

        <li key={country_code}>
           <button className="dropdown-item" onClick={()=> i18next.changeLanguage(code)}
           disabled={code===currentLanguageCode}
           
           >
               <span className={`flag-icon flag-icon-${country_code} mx-2`}
          ></span>
       {name}
     </button>
   </li>

  )) }

  </ul>
  </div>
    </div>
   </div>

      <div className='rightSide d-flex justify-content-center align-items-center'> 
      <img src={log} style={{ width: '600px', height: 'auto' }} />
      
       </div>
      
   </div>
 
</div>
</>
  )
}
     
  