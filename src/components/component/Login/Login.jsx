import axios from 'axios';

import Joi from 'joi';
import React , {useEffect} from 'react'
import Swal from 'sweetalert2';


import 
{
  Link,
 
  Box,
  Button,
  Typography,

  
} from "@mui/material";



import TextField from '@mui/material/TextField';



import { useTranslation} from "react-i18next";
import i18next from 'i18next';
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaGlobe } from './../../../../node_modules/react-icons/fa/index.esm';
import Cookies from 'js-cookie';
import log from '../../imgs/log.jpg';
import URL from '../URL/URL';

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




export default function Login() {
 const currentLanguageCode=Cookies.get('i18next') || 'en'
 const currentLanguage=languages.find((l)=>l.code ===currentLanguageCode)

  const { t }=useTranslation()
  
 let[errorList,setErrorList]=useState([]);
 let[error,setError]=useState('');
 let [message,setMessage]=("")
 let navigate = useNavigate()
 let [user,setUser]=useState({
  username:'',password:''});
 
  function getUser(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
    console.log(myUser);
   
  }
  async function formSubmit(e) {
    e.preventDefault();
  
    let validationResponse = validateRegisterForm();
    console.log(validationResponse);
  
    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);
      return;
    }
  
    try {
      let response = await axios.post(URL + 'auth/jwt/create', user);
      localStorage.setItem('userToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    
      if (response.status === 200) {
        navigate('/new');
        console.log(response);
      } else {
        console.log('Error:', response.data.detail);
        // or display the error message in a UI element
      }
    } catch (error) {
      console.log('Error:', error);
      console.log('Error response:', error.response.data.detail);
      setErrorList([]);
      Swal.fire(
        'Sorry!',
        'No account found with these details',
        'error'
      );
   
      // alert(error.response.data.detail);
      // setMessage(error.response.data.detail)
      // or display the error message in a UI element above the inputs
    }
     
    
      if (error.response && error.response.data && error.response.data.detail) {
        console.log('Error:', error.response.data.detail);
        // or display the error message in a UI element
      } else {
        console.log('An error occurred. Please try again later.');
        // or display a generic error message in a UI element
      }
    }
    

    


function validateRegisterForm(){
  const schema = Joi.object({
    username: Joi.string().required(), 
    password: Joi.string()
    .required(),
  
 
  
  
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

 
    

      




    <div className="row">
  <div className="col-md-6 ">
    <div className="rightSide d-flex justify-content-center align-items-center " >
    
      
    
        
      <form onSubmit={formSubmit}>
      <h2>{t("Welcome back")}</h2>
      
      <br/>
        <h5>{t("Welcome back! please enter your details.")}</h5>
        <br/>
       
      
      
 
 
    
      
        <Box sx={{ display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column' }}>
         <TextField 
          id="username"
         label="Username"
          variant="outlined"   
       
          InputProps={{
            style: {
              height: '50px' // Set to your preferred height
            }
          }} style={{ marginBottom: '16px', width: '100%'}}  autoFocus onChange={getUser} type='text' 
          placeholder={t('Enter Your username')} 
          name='username'
          error={Boolean(getError('username'))}
           helperText={getError('username')}
          
          />
        
        
        
        
         <TextField  id="password"
       label="Password"
        variant="outlined" style={{ marginBottom: '16px', width: '100%' }}  
       
        InputProps={{
          style: {
            height: '50px' // Set to your preferred height
          }
        }} onChange={getUser} 
        type='password'  
        placeholder= {t('Enter Your Password')} 
          name='password'
          error={Boolean(getError('password'))}
          helperText={getError('password')}
          />
         
       </Box>
      
       {/* <div className="form-group">
    <div className="form-check">
    <label className="form-check-label" htmlFor="gridCheck">
         <Typography  variant="p" > Remember me</Typography>
      </label>
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
    </div>
      </div> */}
  <Box display="flex" justifyContent="flex-start"  marginTop="-0.5rem">
  <Typography variant="p"> <Link href="/#/reset" underline="none">
        {t('Forget Password?')}
        </Link></Typography>
      </Box>
  <br/>
       <Box  m={2} >
        <Button type='submit' variant="contained" color="primary" style={{width:'100%'}} >{t("Sign in")}</Button>
         </Box>
        
        
          <Typography   variant="h6" style={{width:'100%',textAlign:'center',justifyContent:'center'}}   >
           {t("Don't hava an account?")} <Link href="/#/register" underline="none">
         {t("sign up")} 
          </Link>  
          </Typography>
          



          
      </form>
      </div>
      </div>
      <div className="col-md-6 ">
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
     <div class="parentContainer">
  <div class="leftSide d-flex justify-content-center align-items-center">
    <img src={log} style={{ width: '600px', height: 'auto' }} />
  </div>
</div>
   
    </div>

</div>
</>
  )
}
