import axios from 'axios';
import React,{useState} from 'react'
import './Medicine.css'
import { FaWindowClose } from 'react-icons/fa/index.esm';
import { FaEdit } from 'react-icons/fa/index.esm';
import { number } from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import URL from '../URL/URL';

const Medicine = () => {
    const [inputarr,setInputarr]= useState([]);

 const [inputdata,setInputdata]= useState({
  name:""
 })
 const [show,setShow]=useState(false)
 const [editIndex,setEditIndex]=useState()
 const[resp,setResp]=useState("")
 const[fail,setFail]=useState()
 const[failreason,setFailreason]=useState('')
 let apiUrl=URL;

  


             
      function handleChange(e){
        setInputdata({
          ...inputdata,
          [e.target.name]:e.target.value
        })
      
      }
   let {name}=inputdata;

   function fillarr(){
    setInputarr([...inputarr,{name}])
    
    console.log(inputdata,'input data what we enter')
    setInputdata({name:''})
    
   }
 
 const deleteRow =(number)=>{
  let copy=[...inputarr]
  copy=copy.filter(
    (item,index)=>number != index
  )
  setInputarr(copy)
 
 }


 

 const handleEdit=(i)=>{
  setInputdata(inputarr[i])
  setShow(true)
  setEditIndex(i)
  deleteRow(i)
}
 

async function medicineSubmit(e) {
  e.preventDefault();
  const token = localStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `JWT ${token}` }
  };
  const response = await axios.post(apiUrl + 'medicine/drugs/bulk_create/', inputarr, config);
  if (response.data.success != 0) {
    setResp(response.data.success_count);
    setFail(0);
  } else {
    setFail(response.data.fail_count);
    setResp(0);
  }
  console.log(response);
  setInputarr([]);
}
    
     return (

    <>

  <div>
    <div className='Medicine'>
      <input type="text" autoComplete='off' name='name' value={inputdata.name} onChange={handleChange} placeholder='Enter The Name ' />
      <button onClick={fillarr}>add</button>
     

   </div>
    
  
    <div className='Med'>
 
<table border={1} cellPadding={10} width={30}>
 <tbody>
 <tr>
    <th>name</th>
    <th>delete</th>
    <th>update</th>
 </tr>
   

  

 

   
    {
      inputarr.map
       ((info,index)=>{
        return(
          <tr key={index}>
           <td>{info.name}  
             
             </td> 
             <td><FaWindowClose  className='icon' onClick={()=>{deleteRow(index)}} style={{ color: 'red'}}/> </td>
             <td>
             <FaEdit className='icon' onClick={() => handleEdit(index)}/></td>
            
            </tr>
          
        )
       }
      
      
         
    )}
   
  
 </tbody>
   
    </table>
    
     
   <button onClick={medicineSubmit}>send</button>
   <div className="card">
      <div className="card-body">
        <h4 className="card-title">Results</h4>
        <p className="card-text">Success count: {resp}</p>
        <p className="card-text">Fail count: {fail}</p>
      </div>
    </div>
   
   </div>
   </div>

    
    
  
   
  
   
  

  

   
 </>
  
     
    
  )
      }

export default Medicine
