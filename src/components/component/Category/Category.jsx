import axios from 'axios';
import React,{useState} from 'react'

import 
{
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


<Box sx={{ display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height:'50vh',
  flexDirection: 'column' }}>
  <TextField
    id="outlined-basic"
    label="Category Name"
    variant="outlined"
    name='name'
    value={inputdata.name}
    onChange={handleChange}
    style={{ marginBottom: '16px' }}
  />
 
  <TextField
    id="outlined-basic"
    label="Category Name(Arabic)"
    variant="outlined"
    name='name_ar'
    value={inputdata.name_ar}
    onChange={handleChange}
    style={{ marginBottom: '16px' }}
  />
  
  <input type="file" onChange={(event) =>{setImageFile(event.target.files[0])}} style={{ marginBottom: '16px' }} />
  <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginBottom: '16px' }}>upload</Button>
 
  <Box m={2}>
    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => {
  fillarr();
  window.scrollBy(0, 500);
}}> 
      add Category
    </Button>
  </Box>
</Box>

  
   







 
<Box   sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',
 marginTop:"10px"

}}>



<TableContainer component={Paper}
 sx={{ maxWidth: '50%',maxHeight:"90%" , borderRadius: '10px' }}
>
 <Table aria-label='simple table' 
 stickyHeader
 >
 <TableHead>
      <TableRow>
      
       
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Category Name")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Category Name(Arabic)")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Category Image")}</TableCell>
        <TableCell style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>
          {("update")}
        </TableCell>
        <TableCell style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>
          {("delete")}
        </TableCell>
     
       
      </TableRow>
    </TableHead>
    
    <TableBody>
  {inputarr.map((info,index) => (
    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell  style={{ padding: '4px' }}>{info.name}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.name_ar}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.image_file}</TableCell>
    


      <TableCell>
         <IconButton type="button" sx={{ p: '10px' }} onClick={()=>{deleteRow(index)}}>
        <ClearIcon />
      </IconButton>
      </TableCell>

   
      <TableCell>
         <IconButton type="button" sx={{ p: '10px' }} onClick={() => handleEdit(index)} >
        <EditNoteIcon />
      </IconButton>
      </TableCell>
       



    </TableRow>
    
    )
  
 
 
    
)}

  
</TableBody>
  </Table>

  </TableContainer>
  <Box m={2}>
        <Button onClick={medicineSubmit} variant="contained" color="primary">
          send
        </Button>
      </Box>
</Box>


























    
  

 
    
 


   
   
 
   
    
    
 
   

   

    
    
  
   
  
   
  

  

   
 </>
  
     
    
  )
      }
      export default Category