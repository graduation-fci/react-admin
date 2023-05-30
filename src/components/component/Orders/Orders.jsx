import axios, { Axios } from 'axios'
import React, { useEffect, useMemo, useState } from 'react'

import 
{
  Select,
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

import { useTranslation} from "react-i18next";
import i18next from 'i18next';

import ReactPaginate from 'react-paginate';
import './Orders.css'
import { FaEdit, FaGlobe, FaPlus } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaFilter } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaTrash } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaSearch } from './../../../../node_modules/react-icons/fa/index.esm';
import Cookies from 'js-cookie';

import debounce from 'lodash.debounce';
import avatar from '../../imgs/avatar.jpg'
import URL from '../URL/URL';
import { useNavigate } from 'react-router-dom';






const languages=[
  {
    code:'en',
    name:'English',
    country_code:'gb'
  },
  {
  code:'ar',
  name:'العربيه',
  country_code:'sa'

},
]  



export default function Orders() {
 
 
  const currentLanguageCode=Cookies.get('i18next') || 'en'
  const currentLanguage=languages.find((l)=>l.code ===currentLanguageCode)
  const { t }=useTranslation()
  const[medicines,setMedicines]=useState([]);
  const [val,setVal]=useState('')
  let apiUrl=URL;
  
  let [selectedMedicineId, setSelectedMedicineId] = useState({"ids":[]});
  let [selectedMedicine,setSelectedMedicine]=useState([{
    id: "" ,
    name:""

  }]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [medicineName, setMedicineName] = useState("Aspirin");
  const [activeDiv, setActiveDiv] = useState(0);
  const [inputarr,setInputarr]= useState([]);

  const [inputdata,setInputdata]= useState({
 
  order_status:''
  })
  const[yeear,setYeear]=useState('')
  //order
  let navigate=useNavigate();

///menu
const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const [selectedOrder, setSelectedOrder] = useState(null);

 const[currentId,setCurrentId]=useState('')
  const handleDetailsClick = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(orderId);
    }}

 
   
     async function getMedicine(){
      let token= localStorage.getItem("userToken")
      let response= await axios.get(apiUrl+'store/orders/',{
        headers:{
          Authorization: 'JWT ' + token
        }})   
   
     setMedicines(response.data.results);
     
    
     console.log(response.data)
     
     

} 


  
 useEffect(()=> {getMedicine();
} ,[]);
 
 const fetchMedicines= async(currentPage)=>{
 let token= localStorage.getItem("userToken")
      let resp= await axios.get(apiUrl+`store/orders/?page=${currentPage}`,{
        headers:{
          Authorization: 'JWT ' + token
        }})  
     return(resp.data.results)
     
 }

 async function handlePageClick(data){
  console.log(data)
  let currentPage=data.selected+1
  

  let medicinesFromServer= await fetchMedicines(currentPage)

  setMedicines(medicinesFromServer);
 
}


 

   //filter*************
 async function fetchData({search,order_status,year,ordering})
  {
   let baseUrl=apiUrl;
  let queryParams={}
   //let token= localStorage.getItem("userToken")
  
  if(year!=null){
  queryParams['year']=year
  setYeear(year)
  }
     
   if(search!=null){
    queryParams['search']=search
    setVal(search)
    
  }
  if(order_status!=null){
    queryParams['order_status']= order_status
  }
  if(ordering!=null){
    queryParams['ordering']=ordering
  }
  let url = `${baseUrl+'store/orders/'}?${getQueryString(queryParams)}`;
    let token= localStorage.getItem("userToken")
    let response = await axios.get(url,{
      headers:{
        Authorization: "JWT " + token,
      }}) 
setMedicines(response.data.results);



  }



  function getQueryString( params){
    const map = new Map(Object.entries(params));
    return [...map]
    .map(([key,value])=>`${key}=${encodeURIComponent(value)}`).join('&')
  }
   
// improve performance
  const handleChange= (e) =>fetchData (
    {search : e.target.value}
    );
  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });


   
//// filter by years
const currentYear = new Date().getFullYear();
const years = Array.from(new Array(currentYear - 1900), (val, index) => 1900 + index);

const handleChange1= (event) => {
  const year = parseInt(event.target.value);
  console.log(year)
  fetchData(year)
};


 
  
  




   const handleSetActiveDiv = (medicine) => {
    setActiveDiv(medicine.number);
    
    setInputdata({
      ...inputdata,
       order_status: medicine.order_status
    });
   
    
    //console.log(inputdata.name)
  };
 

  function fillarr(){
    let token= localStorage.getItem("userToken")
    fetch( apiUrl+`store/orders/${currentId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'JWT ' + token
        },
        body: JSON.stringify( inputdata )
      })
 
   
    } 



    const handleUpdate = async () => {
      let token = localStorage.getItem("userToken");
    
      try {
        const response = await fetch(apiUrl + "medicine/drugs/bulk_patch/", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + token,
          },
          body: JSON.stringify(updatedData),
        });
    
       
          const data = await response.json();
          if(data.updated!=0){
          getMedicine();
          console.log("Products updated:", data);
          alert("Selected products have been updated successfully.");
         
        } else {
          alert("Failed to update selected products.");
    
        }
      } catch (error) {
        console.error(error);
       
      }
      setUpdatedData([])
    setActiveDiv(0)
      setInputarr([]);
      console.log(JSON.stringify(inputarr));
    };


   
   
   
const [editingId, setEditingId] = useState(null);
const [editingField, setEditingField] = useState(null);
const [updatedData, setUpdatedData] = useState([]);

const handleEditClick = (id, field) => {
  setEditingId(id);
  setEditingField(field);
};

const handleEditSave = (id, field, value) => {
  console.log(`New value for field ${field} of medicine ${id}: ${value}`);
  // Perform the update operation and save the new value
  // ...
  const updatedItem = { id, [field]: value };
  setUpdatedData([...updatedData, updatedItem]);
  setEditingId(null);
  setEditingField(null);
};
useEffect(() => {
  console.log(updatedData);
}, [updatedData]);

   
 

function handleDetails(id) {
  const medicine = medicines.find((medicine) => medicine.id === id);
  
 navigate('/orderdetails', { state: { medicine } }) 
}

 


  
  return (   
  
    
    <>
<Paper
      component="form"
       sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
     
    >
       <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search...' }}
        name='search'
        onChange={debouncedResults}
      />

        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        < NotificationsNoneIcon/>
      </IconButton>
      <Avatar
      alt="Remy Sharp"
      src={avatar}
      sx={{width: 24, height: 24  }}
/>
     

     
    </Paper>


    

  {/* 
<div   style={{ display: activeDiv === 1 ? 'block' : 'none'}}>
  
 <label htmlFor='order_status'>order_status</label>
 <input  className='cin' value={inputdata.order_status} type='text' onChange={(event) => setInputdata({ ...inputdata, order_status: event.target.value })} />
 <button onClick={fillarr}>fill</button>

  </div>*/}

      
<Box position="absolute" top={100} right={60} sx={{ display: 'flex' }}>
    
      <Box m={2}>
        <Button onClick={handleUpdate} variant="contained" color="primary" startIcon={<AddIcon />}>
          Update
        </Button>
      </Box>
    </Box>

<Box sx={{ position: 'relative' }}>
  <Box position="absolute" top={80} left={60} m={2}>
    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
      Orders
    </Typography>
  </Box>
 
</Box>


<Box position="absolute" top={150} right={60} m={2}>
      <FilterListIcon onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={ ()=>fetchData ({order_status :'CON' , search:val})}>orders Confirmed</MenuItem>
        <MenuItem onClick={()=>fetchData ({order_staus :'COM', search:val})} >orders Completed</MenuItem>
        <MenuItem onClick={ ()=>fetchData ({order_status :'PEN' , search:val})}>orders Pending</MenuItem>
        <MenuItem onClick={()=>fetchData ({order_status :'CAN', search:val})} >orders Canceled</MenuItem>  
        <MenuItem onClick={()=>fetchData ({ordering :'palced_at', search:val})} >placed at ascednd</MenuItem>  
        <MenuItem onClick={()=>fetchData ({ordering :'-placed_at', search:val})} >placed at descend</MenuItem>   
       < MenuItem><label htmlFor="year-dropdown">Filter by year:</label>
      <select id="year-dropdown"  onClick={(e)=>fetchData({year:e.target.value})} >
        <option value="">All years</option>
        {years.map((year) => (
          <option key={year} value={year} >
            {year}
          </option>
        ))}
      </select></MenuItem>
      </Menu>
    </Box>
 
   
    
 
    <div className="container">
     


 
     <div className="d-flex justify-content-start">
  

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
  



  

   
  <Box   sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',

}}>

  <TableContainer component={Paper}
 sx={{ maxWidth: '90%',maxHeight:"70%" , borderRadius: '10px' }}
>
 <Table aria-label='simple table' 
 stickyHeader
 >
 <TableHead>
      <TableRow>       
        <TableCell  align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Order ID")}</TableCell>
        <TableCell  align="center"   style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Customer Id")}</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("order Status")}</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Total Price")}</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Placed at")}</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("City")}</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Details")}</TableCell>
   
      </TableRow>
    </TableHead>
    
    <TableBody>
  {medicines.map((medicine) => (
    <TableRow key={medicine.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      

      <TableCell    align="center"   style={{ padding: '4px' }}>{medicine.id}</TableCell>

      <TableCell align="center"
        style={{ padding: '4px' }}>
        {medicine.customer}
     
      </TableCell>

      <TableCell
         align='center'
        style={{ padding: '4px' }}
        onClick={() => handleEditClick(medicine.id, 'order_status')}
      >
        {editingId === medicine.id && editingField === 'order_status' ? (
        
<input
type="text"
defaultValue={medicine.order_status}
onBlur={(event) =>
handleEditSave(medicine.id, 'order_staus', event.target.value)
}
/>
        ) : (
          medicine.order_status
        )}
      </TableCell>
      
      <TableCell align="center"
        style={{ padding: '4px' }}>
        {medicine.total_price}
     
      </TableCell>
      
      <TableCell align="center"
        style={{ padding: '4px' }}>
        {medicine.placed_at}
     
      </TableCell>
      
      <TableCell align="center"
        style={{ padding: '4px' }}>
        {medicine.address.city}
     
      </TableCell>
      <TableCell align="center"
        style={{ padding: '4px' }}>
         <Button  onClick={()=>handleDetails(medicine.id)}>Details</Button>
      </TableCell>
      

    </TableRow>
  ))}
</TableBody>
  </Table>
  </TableContainer>
</Box>
  

  

  
   
  

 




 



    <ReactPaginate 
     previousLabel={'previous'} 
     nextLabel={'next'}
     breakLabel={'...'}
     pageCount={2}
     onPageChange={handlePageClick}
     containerClassName={'pagination justify-content-center'}
     pageClassName={'page-item'}
     pageLinkClassName={'page-link'}
     previousClassName={'page-item'}
     previousLinkClassName={'page-link'}
     nextClassName={'page-item'}
     nextLinkClassName={'page-link'}
     breakClassName={'page-item'}
     breakLinkClassName={'page-link'}
     activeClassName={'active'}
     
     /> 


 </>

  

    
  )
};
