import axios from 'axios';
import jwtDecode from 'jwt-decode';
//import Joi from 'joi';
import React , {useEffect} from 'react'
import { useTranslation} from "react-i18next";
import i18next from 'i18next';
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaGlobe } from './../../../../node_modules/react-icons/fa/index.esm';
import Cookies from 'js-cookie';
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import log from '../../imgs/log.jpg';
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
  
 /*let[errorList,setErrorList]=useState([]);*/
 let[error,setError]=useState('');
 let navigate = useNavigate()
 let [user,setUser]=useState({
  username:'',password:''});
  function getUser(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
    console.log(myUser);
  }
  async function formSubmit(e){
    e.preventDefault();
    let response= await axios.post("http://localhost:8000/auth/jwt/create", user);
    localStorage.setItem('userToken',response.data.access)
    localStorage.setItem('refreshToken',response.data.refresh)
    if(response.status===200){
        navigate('/new')
    }
    console.log(response);
    
   /*let validationResponse =  validateRegisterForm();
   if(validationResponse.error){
   /* setErrorList(validationResponse.error.details);
   }
   else{ */
    
   
   
   /*const response= await axios.post("http://localhost:8000/auth/users/", user);*/
  
  /* if(data.message ==="success"){
       
   }
else{
     setError(data.message);
}
console.log(response.data);
}*/
/*function validateRegisterForm(){
  const schema = Joi.object({
    email:joi.string().email({tlds:{allow:['com','net','org']}}).required
    password:Joi.string().pattern(new RegExp('^[A-Z][a-z]{2,8}$')),
   

  
});
  return schema.validate(user ,{abortEarly:false});*/

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
        {error&& <div className="alert alert-danger"> </div>}
        {/* {errorList.map((error,index)=> index===1? 
        <div className="alert alert-danger p-2">password invalid: password must be at least 8 characters </div>:
        <div className="alert alert-danger p-2">{error.message}</div> 
        )}*/}
    
      <div className="col-xs-4">
         <label htmlFor='username'>{t("username")}</label>
         <input  autoFocus onChange={getUser} type='text' placeholder={t('Enter Your username')}  className="form-control input-sm" name='username'/>
        </div>  
        <br/>
        <div className="col-xs-4">
         <label htmlFor='password'>{t("password")}</label>
         <input onChange={getUser} type='password' placeholder= {t('password')}  className="form-control input-sm " name='password'/>
         
        </div> 
        <br/>
        <div className="form-group">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        {t("Remember me")}
      </label>
    </div>
  </div> 
  <br/>
       <div className='d-flex mb-1'>
        <button type='submit' className="btn btn-primary  flex-fill me-1">{t("Sign in")}</button>
          </div>
          <br/>
          <div className='d-flex justify-content-center align-items-center'>
           <li className='px-2' >{t("Don't hava an account?")}<NavLink className='link-primary' to='/register'>  {t("sign up")} </NavLink></li>
           </div>
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
    <img src={log} style={{ width: '800px', height: 'auto' }} />
  </div>
</div>
   
    </div>

</div>
</>
  )
}
