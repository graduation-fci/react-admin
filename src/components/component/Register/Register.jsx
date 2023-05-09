import axios from 'axios';
import Joi from 'joi';
import React , {useEffect} from 'react'
import { useTranslation} from "react-i18next";
import i18next from 'i18next';
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import"./Register.css"
import { FaGlobe } from './../../../../node_modules/react-icons/fa/index.esm';
import Cookies from 'js-cookie';
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
  const response= await axios.post("http://localhost:8000/auth/users/", user);

    console.log(response)
    //history.push({
      //pathname:  "/home",
      //state: {
        //response:  
       //} 
     //})
    // window.location.href="/login"
   //let validationResponse =  validateRegisterForm();
   //if(validationResponse.error){
   //setErrorList(validationResponse.error.details);
   //}
   
//    if(response.status === 400){
//      setError(response.status);
//       console.log(error);  
//    }
// else{
  //   setError(response.status);
//}
//console.log(response.data);
}
/*
function validateRegisterForm(){
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(10).required(),
    last_name: Joi.string().min(3).max(10).required(),
    username: Joi.string().min(3).max(30).required(), 
    password:Joi.string().pattern(new RegExp('^[A-Z][a-z]{2,8}$')).required(),
    email:Joi.string().required().email({ tlds: { allow: false } }),
    //profile_type:Joi.required(),
  
  
  });

  //return schema.validate(user ,{abortEarly:false});
}*/

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

{/* {error&& <div className="alert alert-danger"> </div>}
 {errorList.map((error,index)=> index===4? 
 <div className="alert alert-danger p-2">password invalid: password must be at least 8 characters </div>:
<div className="alert alert-danger p-2">{error}</div> 
 )}*/}
 <br/>
  <div className='col-xs-4'>
   <label htmlFor='username'>{t("username")}</label>
   <input  autoFocus onChange={getUser} type='text'  placeholder={t('Enter Your username')} className='form-control ' name='username'/>
  </div>
  <br/>
  <div className='col-xs-4'>
   <label htmlFor='first_name'>{t("first_name")}</label>
   <input onChange={getUser} type='text' placeholder={t('Enter Your first_name')} className='form-control  input-sm ' name='first_name'/>
  </div>   
  <br/>   
  <div className='col-xs-4'>
   <label htmlFor='last_name'>{t("last_name")}</label>
   <input onChange={getUser} type='text' placeholder={t('Enter Your last_name')} className='form-control  input-sm ' name='last_name'/>
  </div>  
  <br/>
  <div className='col-xs-4'>
   <label htmlFor='email'>{t("email")}</label>
   <input onChange={getUser} type='email' placeholder={t('Enter Your Email')}  className='form-control  input-sm ' name='email'/>
  </div> 
  <br/> 
  <div className="col-xs-4">
   <label htmlFor='password'>{t("password")}</label>
   <input onChange={getUser} type='password' placeholder={t('password')}  className='form-control input-sm ' name='password'/>
  </div>  
  
  {/* 
  <input onChange={getUser} type="radio" name="PRF"/>
  <label htmlFor="profile_type">PRF</label><br/>
  <input onChange={getUser} type="radio" name="STD" />
  <label htmlFor="profile_type">STD</label>*/}

  
<br/>
<div className='d-flex mb-1'>
  <button type='submit' className="btn btn-primary  flex-fill me-1">{t("Sign in")}
    </button>
</div>
<br/> 
<div className='d-flex justify-content-center align-items-center'>
    <li className='py-2'>{t("Already have an account?")} <NavLink className='link-primary' to='/login'>{t("Sign in")} </NavLink></li>
 </div>
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

      <div className='rightSide d-flex justify-content-center align-items-center'> image </div>
   
   </div>
 
</div>
</>
  )
}
     
  