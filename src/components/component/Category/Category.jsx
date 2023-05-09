import axios from 'axios';
import React,{useState} from 'react'
import './Category.css'
import { FaWindowClose } from 'react-icons/fa/index.esm';
import { FaEdit } from 'react-icons/fa/index.esm';
import { number } from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons'; 
import {storage} from '../FireBase'
import {ref , uploadBytes , getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import URL from '../URL/URL';


const Category = () => {
    const [inputarr,setInputarr]= useState([  

      ]);

 const [inputdata,setInputdata]= useState({
  name:"",
  name_ar:"",
  image_file:""
 })

 
 const [show,setShow]=useState(false)
 const [editIndex,setEditIndex]=useState()
 const[resp,setResp]=useState("")
 const[fail,setFail]=useState()
 const[failreason,setFailreason]=useState('')
 let apiUrl=URL


 
 
  {/*  
    // image to firebase
    function uploadImage() {
      if (imageUpload == null) return;
    
      // Generate a random 6-character string for the filename
      const filename = `${v4().substr(0, 6)}-${imageUpload.name}`;
    
      const imageRef = ref(storage, `images/${filename}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
          alert('Image uploaded. URL: ' + url);
    
          setInputdata({
            ...inputdata,
            image_file: url,
          });
        });
      });
    }*/}
    const[imagefile,setImageFile]=useState(null);
    const formData= new FormData();
  

   const handleUpload=async (e)=>{
    let token= localStorage.getItem("userToken")
    e.preventDefault();
    formData.append('image',imagefile);



    try{
      const response=await fetch(apiUrl+'medicine/images/',{
      method:'POST',
      body:formData,
      headers:{
        Authorization: 'JWT ' + token
      }
     
    });
   
  const data=await response.json();
    console.log(data.id);
   
    setInputdata({
      ...inputdata,
      image_file: data.id,
    });
    console.log(inputdata.image_file) 
    }catch (error){
      console.log(error)
    }
   
   }
                 
 


      function handleChange(e){
        setInputdata({
          ...inputdata,
          [e.target.name]:e.target.value
          
        })
        
      
      }
   let {name,name_ar,image_file}=inputdata;

   function fillarr(){
    setInputarr([...inputarr,{name,name_ar,image_file}])
    
    console.log(inputdata,'input data what we enter')
    setInputdata({name:'',name_ar:'',image_file:''})
    console.log(inputarr)
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
        let token = localStorage.getItem('userToken');
        e.preventDefault();
      
        const response = await axios.post(apiUrl + 'medicine/categories/bulk_create/', inputarr, {
          headers: {
            Authorization: 'JWT ' + token
          }
        });
      
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

  
    <div className='Medicine'>
    <span>
     <h2>Categoey  </h2>
      
    </span>
      
      <input type="text" autoComplete='off' name='name' value={inputdata.name} onChange={handleChange} placeholder='Enter The Name' /><br/>
      <input type="text" autoComplete='off' name='name_ar' value={inputdata.name_ar} onChange={handleChange} placeholder='Enter The Name_ar' /><br/>
      <div>
      <label htmlFor="image-input">Choose an image:</label>
     <input type="file"  onChange={(event) =>{setImageFile(event.target.files[0])}} />
      <button onClick={handleUpload} >upload</button>
    </div>
      <button onClick={fillarr}>add</button>
     

   </div>
    
  
    <div className='Med'>
 
    
 


<table border={1} cellPadding={10} width={30}>
 <tbody>
 <tr>
    <th>name</th>
    <th> name_ar</th>
    <th>image_name </th>
    <th>delet</th>
    <th>update</th>
 </tr>
   
    {
      inputarr.map
       ((info,index)=>{
        return(
            <tr key={index}>
               
          <td>{info.name}</td>
          <td>{info.name_ar}</td>
          <td> {info.image_file}</td>
          <td><FaWindowClose  className='icon' onClick={()=>{deleteRow(index)}}/></td>
          <td><FaEdit className='icon'onClick={()=>handleEdit(index)} /></td>

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
   

    
    
  
   
  
   
  

  

   
 </>
  
     
    
  )
      }
      export default Category