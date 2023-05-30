import axios, { Axios } from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
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
import avatar from '../../imgs/avatar.jpg'
import { useTranslation} from "react-i18next";
import i18next from 'i18next';

import ReactPaginate from 'react-paginate';
import './Category1.css'
import { FaGlobe,FaEdit,FaPlus } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaFilter } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaTrash } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaSearch } from './../../../../node_modules/react-icons/fa/index.esm';
import Cookies from 'js-cookie';

import debounce from 'lodash.debounce';
import URL from '../URL/URL';
import New from '../New/New';







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



export default function Category1({prop}) {


  const currentLanguageCode=Cookies.get('i18next') || 'en'
  const currentLanguage=languages.find((l)=>l.code ===currentLanguageCode)
  const { t }=useTranslation()
  const[medicines,setMedicines]=useState([]);
  const [val,setVal]=useState('')
  let apiUrl=  URL;

  let [selectedMedicineId, setSelectedMedicineId] = useState({"ids":[]});
 
  let [selectedMedicine,setSelectedMedicine]=useState([{
    id: "" ,
    name:"",
    name_ar:"",
    image:""

  }])
 
  const [activeDiv, setActiveDiv] = useState(0);
  const [inputarr,setInputarr]= useState([]);

  const [inputdata,setInputdata]= useState({
   name:""
  })
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 


  
 
 
   
     async function getMedicine(){
      let token= localStorage.getItem("userToken")
      let response= await axios.get(apiUrl+'medicine/categories/',{
     headers:{
      Authorization: 'JWT ' + token
     }})

     setMedicines(response.data.results);
     
    
     console.log(medicines)
     

} 


  
 useEffect(()=> {getMedicine();
} ,[]);
 
 const fetchMedicines= async(currentPage)=>{
    let token= localStorage.getItem("userToken")
      let resp= await axios.get(apiUrl+`medicine/categories/?page=${currentPage}`,{
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
 async function fetchData({search,ordering})
  {
   let baseUrl=apiUrl;
  let queryParams={}
   let token= localStorage.getItem("userToken")
   if(search!=null){
    queryParams['search']=search
    setVal(search)
    
  }
  if(ordering!=null){
    queryParams['ordering']=ordering
  }
  let url=`${baseUrl+'medicine/categories/'}?${getQueryString(queryParams)}`
  let response= await axios.get(url,{
  headers:{
    Authorization: 'JWT ' + token
   }}) 
setMedicines(response.data.results);


  }



  function getQueryString( params){
    const map = new Map(Object.entries(params));
    return [...map]
    .map(([key,value])=>`${key}=${encodeURIComponent(value)}`).join('&')
  }
   
// improve performance
  const handleChange= (e) =>fetchData ({search : e.target.value});
  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });




const handleSelectMedicineId = (id) => {
  const index = selectedMedicineId.ids.indexOf(id);

  if (index === -1) {
    // Add the ID to the list of selected IDs
    const newIds = [...selectedMedicineId.ids, id];
    setSelectedMedicineId({ ids: newIds });
  } else {
    // Remove the ID from the list of selected IDs
    const newIds = selectedMedicineId.ids.filter((medId) => medId !== id);
    setSelectedMedicineId({ ids: newIds });
  }
};
  useEffect(() => {
    console.log(selectedMedicineId);
  }, [selectedMedicineId]);
 ///////////////////////////// delete
 const handleDelete = async () => {
  let token = localStorage.getItem('userToken');

  try {
    const response = await fetch(apiUrl + 'medicine/categories/bulk_delete/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(selectedMedicineId)
    });
    const data = await response.json();
    if (data.deleted!=0) {
      await getMedicine(); // Call getMedicine() before displaying the alert message
      alert('Selected categories have been deleted successfully.');
    } else {
      alert('Failed to delete selected categories.');
    }
  } catch (error) {
    console.error(error);
  
  }
 setSelectedMedicineId({ids:[]})
  console.log(JSON.stringify(selectedMedicineId));
}; 
 
  

///update
const handleSetActiveDiv = (medicine) => {
  setActiveDiv(medicine.number);
 
  setInputdata({
    ...inputdata,
     id: medicine.id,
     name:medicine.name,
     name_ar:medicine.name_ar
  });
  
  //console.log(inputdata.name)
};
let {name,name_ar,id}=inputdata;
function fillarr(){
  setInputarr([...inputarr,{name,name_ar,id}])
  
  console.log(inputdata,'input data what we enter')
  setInputdata({name:'',name_ar:''})
  
 }


 const handleUpdate = async () => {
  let token = localStorage.getItem("userToken");

  try {
    const response = await fetch(apiUrl + "medicine/categories/bulk_patch/", {
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


//////

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


<New prop={getMedicine}/>

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
    
    
    
 
 
 



 <nav>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
      





 {/**lang */}
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
  

      </ul>
    </nav>



    <Box sx={{ position: 'relative' }}>
  <Box position="absolute" top={0} left={60} m={2}>
    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
      Category
    </Typography>
  </Box>
 
</Box>
 

<Box position="absolute" top={60} right={60} sx={{ display: 'flex' }}>
      <Box m={2}>
        <Button onClick={prop} variant="contained" color="primary" startIcon={<AddIcon />}>
          New Category
        </Button>
      </Box>
      <Box m={2}>
        <Button onClick={handleDelete}  variant="contained" color="primary" startIcon={<AddIcon />}>
          Delete
        </Button>
      </Box>
      <Box m={2}>
        <Button onClick={handleUpdate} variant="contained" color="primary" startIcon={<AddIcon />}>
          Update
        </Button>
      </Box>
    </Box>



    <Box position="absolute" top={150} right={60} m={2}>
      <FilterListIcon onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={ ()=>fetchData ({ordering :'name' , search:val})}>name ascending</MenuItem>
        <MenuItem onClick={()=>fetchData ({ordering :'-name', search:val})} >name descending</MenuItem>
        <MenuItem onClick={ ()=>fetchData ({ordering :'name_ar' , search:val})}>name_ar ascending</MenuItem>
        <MenuItem onClick={()=>fetchData ({ordering :'-name_ar', search:val})} >name_ar descending</MenuItem>   
      </Menu>
    </Box>



    
   


 
   
     
   
      
 
    
  
  
      
  



  

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
      <TableCell style={{ backgroundColor: '#f5f5f5', padding: '4px' }}>
  <FormGroup>
    <FormControlLabel
      control={<Checkbox   />}
      sx={{ mr: 0, ml: '-12px', transform: 'scale(0.8)' }}
    />
  </FormGroup>
</TableCell>
       
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Category ID")}</TableCell>
        <TableCell   style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Categry Name")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Categry Name(Arabic)")}</TableCell>
        <TableCell style={{ backgroundColor: '#f5f5f5',padding:'4px' }} > {t("category Image")}</TableCell>
       
      </TableRow>
    </TableHead>
    
    <TableBody>
  {medicines.map((medicine) => (
    <TableRow key={medicine.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell style={{ padding: '4px' }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox    onClick={() => handleSelectMedicineId(medicine.id)} />}
            sx={{ mr: 0, ml: '-12px', transform: 'scale(0.8)' }}
          />
        </FormGroup>
      </TableCell>

      <TableCell style={{ padding: '4px' }}>{medicine.id}</TableCell>

      <TableCell
     
        style={{ padding: '4px' }}
        onClick={() => handleEditClick(medicine.id, 'name')}
      >
        {editingId === medicine.id && editingField === 'name' ? (
          <input
            type="text"
            defaultValue={medicine.name}
            onBlur={(event) =>
              handleEditSave(medicine.id, 'name', event.target.value)
            }
          />
        ) : (
          medicine.name
        )}
      </TableCell>

      <TableCell
      
        style={{ padding: '4px' }}
        onClick={() => handleEditClick(medicine.id, 'name_ar')}
      >
        {editingId === medicine.id && editingField === 'name_ar' ? (
          <input
            type="text"
            defaultValue={medicine.name_ar}
            onBlur={(event) =>
              handleEditSave(medicine.id, 'name_ar', event.target.value)
            }
          />
        ) : (
          medicine.name_ar
        )}
      </TableCell>
    
      <TableCell>
               <img 
               src={medicine.image.image} 
                style={{ width: "50px", marginRight: "5px" }}
                />
            
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
