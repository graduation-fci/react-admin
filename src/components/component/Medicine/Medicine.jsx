import axios from 'axios';
import React,{useState} from 'react'

import 
{
  
  Box,
  Button,
  
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper'

import IconButton from '@mui/material/IconButton';

import ClearIcon from '@mui/icons-material/Clear';
import EditNoteIcon from '@mui/icons-material/EditNote';


import TextField from '@mui/material/TextField';
import './Medicine.css'

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

<Box   sx={{ display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height:'20vh' }}>
 
    <TextField  id="outlined-basic" label="Drug Name" variant="outlined"name='name' value={inputdata.name} onChange={handleChange}  />
    <Box m={2}>
        <Button onClick={fillarr} variant="contained" color="primary" startIcon={<AddIcon />}>
          add Drug
        </Button>
      </Box>
     
      </Box>

 
    
   <Box   sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '70vh',

}}>



<TableContainer component={Paper}
 sx={{ maxWidth: '50%',maxHeight:"70%" , borderRadius: '10px' }}
>
 <Table aria-label='simple table' 
 stickyHeader
 >
 <TableHead>
      <TableRow>
      
       
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Drug Name")}</TableCell>
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

export default Medicine
