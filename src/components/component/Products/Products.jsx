import axios from 'axios';
import React,{useState , useEffect} from 'react'
import { FaWindowClose } from 'react-icons/fa/index.esm';
import { FaEdit } from 'react-icons/fa/index.esm';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {storage} from '../FireBase'
import {ref , uploadBytes , getDownloadURL } from 'firebase/storage'

import URL from './../URL/URL';


const Products = () => {
    const [inputarr,setInputarr]= useState([]);

 const [inputdata,setInputdata]= useState({
    name : "",
    name_ar:"",
    price: '',
    inventory:'',
    company: "",
    parcode: '',
    image_files: []
 })

 const [inputdataArr,setInputdataArr]= useState({

  category: null,

  drug: "",
 
})
 const [show,setShow]=useState(false)
 const [editIndex,setEditIndex]=useState()
 const[resp,setResp]=useState("")
 const[fail,setFail]=useState()
 const[failreason,setFailreason]=useState('')
 let apiUrl=URL
 const [imageUpload,setImageupload]=useState(null)
 
 const [cat,setCat]=useState([]);
 
 const [drug,setDrug]=useState([]);
 
 const [anchorEl, setAnchorEl] = useState(null);
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  

    ////// image to firebase
   {/* function uploadImage() {
      if (imageUpload == null) return;
    
      // Generate a random 6-character string for the filename
      const filename = `${v4().substr(0, 6)}-${imageUpload.name}`;
    
      const imageRef = ref(storage, `images/${filename}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
          alert('Image uploaded. URL: ' + url);
         
          let obj = { ...inputdata };
          obj.image_files = [url];
    
          setInputdata(obj);
        });
      });
    }*/}
  //// category


 

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDrugs,setSelectedDrugs]=useState([]);

  async function getCat(searchTerm) {
    const url = searchTerm ? `${apiUrl+'medicine/categories/'}?search=${searchTerm}` : apiUrl+'medicine/categories/';
    let token = localStorage.getItem("userToken");
    let response = await axios.get(url, {
      headers: { Authorization: `JWT ${token}` },
    });
    setCat(response.data.results);
  }

  useEffect(() => {
    getCat();
  }, []);


  function handleSearchInputChange(event) {
    const searchTerm = event.target.value;
    getCat(searchTerm);
  }


  function handleCategoryChange(categories) {
    setSelectedCategories(categories);
    
    setInputdataArr({
      ...inputdataArr,
      category: categories.join(','),
    });
    console.log(inputdataArr);
  }  
/////druggs
async function getDrug(searchTerm) {
  const url = searchTerm ? `${apiUrl+'medicine/drugs/'}?search=${searchTerm}` : apiUrl+'medicine/drugs/';
  let token = localStorage.getItem("userToken");
  let response = await axios.get(url, {
    headers: { Authorization: `JWT ${token}` },
  });
  setDrug(response.data.results);
}

useEffect(() => {
  getDrug();
}, []);


function handleSearchDrugChange(event) {
  const searchTerm = event.target.value;
  getDrug(searchTerm);
}

function handleDrugChange(drugs) {
  setSelectedDrugs(drugs);
  setInputdataArr({
    ...inputdataArr,
    drug: drugs.join(", "),
  });
  console.log(inputdataArr);
}
   

    const[imagefiles,setImageFiles]=useState([]);
   
  
    const handleUpload = async (e) => {
      let token = localStorage.getItem('userToken')
      e.preventDefault();
    
      // Create a new FormData object
      const formData = new FormData();
    
      // Loop through the selected files and append each one to the FormData object
      for (let i = 0; i < imagefiles.length; i++) {
        formData.append('images', imagefiles[i]);
      }
    


    try{
      const response=await fetch(apiUrl+'medicine/images/bulk_create_images/',{
      method:'POST',
      body:formData,
      headers:{
        Authorization:'JWT ' + token
      }
     
    });
   
  const data=await response.json();
    console.log(data.id);
   
    setInputdata({
      ...inputdata,
      image_files: data.success_ids,
    });
    console.log(inputdata.image_files) 
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

      function handleChangeArr(e){
        setInputdataArr({
          ...inputdataArr,
          [e.target.name]:e.target.value
        })
      
      }
  

   function fillarr(){
    
    let obj ={ ...inputdata}
    obj.category = [inputdataArr.category]
    obj.drug = [inputdataArr.drug]
    console.log(obj);

    setInputarr([...inputarr,obj])
    
    console.log(inputdata,'input data what we enter')
    setInputdata({name:'', inventory:'', name_ar:'',  price:'', company:'', parcode:'',image_files:''})
    setInputdataArr({category:'',drug:''})
    setSelectedCategories([])
    setSelectedDrugs([])
    
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
 

      async function  medicineSubmit(e){
      let token=localStorage.getItem('userToken')
        e.preventDefault();
        const config = {
          headers: { Authorization: `JWT ${token}` }
        };
      const response= await axios.post(apiUrl+"medicine/products/bulk_create/" ,inputarr,config);
        if(response.data.success!=0){
          setResp(response.data.success_count)   
          setFail(0)
        } else{
            setFail(response.data.fail_count)
            setResp(0)
            
        }
        console.log(inputarr)
        setInputarr([])
        
      }
    
     return (

    <>


    
 
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height:'100vh',
  marginTop:'50px'
  
}}>
      <TextField   style={{ marginBottom: '16px' }} id="outlined-basic" label="Product Name" variant="outlined"  name='name' value={inputdata.name} onChange={handleChange}  />
      <TextField   style={{ marginBottom: '16px' }} id="outlined-basic" label="Product Name(Arabic)" variant="outlined"  name='name_ar' value={inputdata.name_ar} onChange={handleChange} />
      <TextField   style={{ marginBottom: '16px' }} id="outlined-basic" label="Product Inventory" variant="outlined"  name='inventory' value={inputdata.inventory} onChange={handleChange}  pattern="[0-9]*" />
     
    
      <TextField   style={{ marginBottom: '16px' }} id="outlined-basic" label="Product Price" variant="outlined"  name='price' value={inputdata.price} onChange={handleChange}  />
      
      <TextField   style={{ marginBottom: '16px' }} id="outlined-basic" label=" Product Company" variant="outlined"  name='company' value={inputdata.company} onChange={handleChange}  />
      <TextField   style={{ marginBottom: '16px' }} id="outlined-basic" label="Product Parcode" variant="outlined"  name='parcode' value={inputdata.parcode} onChange={handleChange}  />
      <div>
      
      <input type="file"   style={{ marginBottom: '16px' }}  onChange={(e) => setImageFiles(e.target.files)} multiple />
      <Box m={2}>
    <Button     style={{ marginBottom: '16px' }} variant="contained" color="primary"  onClick={handleUpload}>
       Upload
    </Button>
  </Box>
    </div>
     <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Click to choose category
      </button>
      <ul className="dropdown-menu">

      <li>
      <div className="input-group mb-3">
        <input type="text"  name='categoryMissed'  onChange={(event)=>handleSearchInputChange(event)}  placeholder="Search by category name..." />
     
      </div>
    </li>
        {cat.map((category) => (
          <li key={category.id}>
            <button
              className="dropdown-item"
              onClick={() => handleCategoryChange([...selectedCategories, category.name])}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <p>Selected categories: {inputdataArr.category}</p>
    </div>


    
      





      
{/**drugssss */}
<div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Click to choose drugs
      </button>
      <ul className="dropdown-menu">

      <li>
      <div className="input-group mb-3">
        <input type="text"  name='categoryMissed'  onChange={(event)=>handleSearchDrugChange(event)}  placeholder="Search by drug name..." />
     
      </div>
    </li>

        {drug.map((drug) => (
          <li key={drug.id}>
            <button
              className="dropdown-item"
              onClick={() => handleDrugChange([...selectedDrugs, drug.name])}
            >
              {drug.name}
            </button>
          </li>
        ))}
      </ul>
      <p>Selected drugs: {inputdataArr.drug}</p>
    </div>

    <Box m={2}>
    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => {
  fillarr();
  window.scrollBy(0, 500);
}}> 
      Add Product
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
 sx={{ maxWidth: '90%',maxHeight:"70%" , borderRadius: '10px' }}
>
 <Table aria-label='simple table' 
 stickyHeader
 >
 <TableHead>
      <TableRow>
      
       
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Name")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Name(Arabic)")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Inventory")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Price")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Company")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Parcode")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Category")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Drug")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{("Product Image")}</TableCell>
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
      <TableCell  style={{ padding: '4px' }}>{info.inventory}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.price}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.company}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.parcode}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.category}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.drug}</TableCell>
      <TableCell  style={{ padding: '4px' }}>{info.image_files}</TableCell>


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
export default Products