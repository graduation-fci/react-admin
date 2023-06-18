import axios, { Axios } from 'axios'
import React, { useRef , useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2';
import { getMedicine } from '../GrtProducts/GetProducts';
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
import { useTranslation} from "react-i18next";
import i18next from 'i18next';

import ReactPaginate from 'react-paginate';
import { FaEdit, FaGlobe, FaPlus } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaFilter } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaTrash } from './../../../../node_modules/react-icons/fa/index.esm';
import { FaSearch } from './../../../../node_modules/react-icons/fa/index.esm';
import Cookies from 'js-cookie';

import debounce from 'lodash.debounce';
import Category from './../Category/Category';
import avatar from '../../imgs/avatar.jpg'
import URL from './../URL/URL';






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



export default function Products1({prop}) {
 

  const currentLanguageCode=Cookies.get('i18next') || 'en'
  const currentLanguage=languages.find((l)=>l.code ===currentLanguageCode)
  const { t }=useTranslation()
  const[medicines,setMedicines]=useState([]);
  const [val,setVal]=useState('')
  const[cat,setCat]=useState('')

  const [gt,setGt]=useState('')
  const [lt,setLt]=useState('')
  
  let apiUrl=URL
  
  const [catArr,setCatArr]=useState([]);
  const [drugArr,setDrugArr]=useState([]);
  let [selectedMedicineId, setSelectedMedicineId] = useState({"ids":[]});
  let [selectedMedicine,setSelectedMedicine]=useState([{
    name : "",
    name_ar:"",
    category: [""],
    price: "",
    drug: [""],
    company: "",
    parcode: null,
    image_files: []
 }])
 const [anyDrug,setAnyDrug]=useState(null)
 const [activeDiv, setActiveDiv] = useState(0);
 const [inputarr,setInputarr]= useState([]);

 const [inputdata,setInputdata]= useState({
    name : "",
    name_ar:"",
   
    
    price: "",
  
    company: "",
    parcode: null,

 })

 const[anyCat,setAnycat]=useState(null)

 const [anchorEl, setAnchorEl] = useState(null);
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
 const[count,setCount]=useState()  
   
  useEffect(() => {
    const fetch = async () => {
      const data = await getMedicine();
      setMedicines(data.medicines);
      setCount(data.count)
      console.log(data.medicines); // Check the value of the medicines state
    };
    fetch();
  }, []);
 
 
 const fetchMedicines= async(currentPage)=>{
      let token= localStorage.getItem("userToken")
      let resp= await axios.get(apiUrl+`medicine/products/?page=${currentPage}`,{
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


const handleDrugSelect = (id) => {
  setAnyDrug(id);
  fetchData({ drug: id });
};
const handleCategorySelect = (id) => {
  setAnycat(id);
  fetchData({ category: id });
};

   //filter*************
   async function fetchData({ search, ordering,drug,category } ) {
    let baseUrl = apiUrl;
    let queryParams = {};
    if(anyCat!=null){
      queryParams['category']=anyCat;
    }

    if (drug != null) {
      queryParams["drug"] = drug;
      setAnyDrug(drug)
    }
    if(category!=null){
      queryParams["category"]=category;
      setAnycat(category)
    }
    
    if (search != null) {
      queryParams['search'] = search;
      setVal(search);
    }
  
    if (ordering != null) {
      queryParams['ordering'] = ordering;
    }
    
    const priceGtInput = document.querySelector('input[name="price__gt"]');
    const priceGtValue = priceGtInput.value;
    if (priceGtValue) {
      queryParams['price__gt'] = priceGtValue;
      setGt(priceGtValue)
    }
    const priceLtInput = document.querySelector('input[name="price__lt"]');
    const priceLtValue = priceLtInput.value;
    if (priceLtValue) {
      queryParams['price__lt'] = priceLtValue;
      setLt(priceLtValue)
    }
  
  
    let url = `${baseUrl+'medicine/products/'}?${getQueryString(queryParams)}`;
    let token= localStorage.getItem("userToken")
    let response = await axios.get(url,{
      headers:{
       Authorization: 'JWT ' + token
      }}) 
  
    setMedicines(response.data.results);
  }

 
   
  function getQueryString(params){
    const map = new Map(Object.entries(params));
    return [...map]
    .map(([key,value])=>`${key}=${encodeURIComponent(value)}`).join('&')
  }
   // improve performance
  
  const handleChange1= (e) =>fetchData (
    
    {search : e.target.value}
  )
  const debouncedResults1 = useMemo(() => {
    return debounce(handleChange1,300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults1.cancel();
    };
  }); 
  //category
  async function getCat(searchTerm) {
    const url = searchTerm ? `${apiUrl+'medicine/categories/'}?search=${searchTerm}` : apiUrl+'medicine/categories/';
    let token= localStorage.getItem("userToken");
    const response = await axios.get(url,{
      headers:{
       Authorization: 'JWT ' + token
      }}) 
    setCatArr(response.data.results);
  }
  function handleSearchInputChange(event) {
    const searchTerm = event.target.value;
    getCat(searchTerm);
  }

  
  useEffect(() => {
    getCat();
  }, []);
//// drugs
  async function getDrug(searchTerm) {
    const url = searchTerm ? `${apiUrl+'medicine/drugs/'}?search=${searchTerm}` : apiUrl+'medicine/drugs/';
    let token= localStorage.getItem("userToken");
    const response = await axios.get(url,{
      headers:{
       Authorization: 'JWT ' + token
      }}) 
    setDrugArr(response.data.results);
  }
  function handleSearchDrugChange(event) {
    const searchTerm = event.target.value;
    getDrug(searchTerm);
  }

  
  useEffect(() => {
    getDrug();
  }, []);



  
  
  
   
  

  




  const handleSelectMedicineId = (id) => {
    const index = selectedMedicineId.ids.indexOf(id);
  
    if (index === -1) {
      // Add the ID to the list of selected IDs
      const newIds = [...selectedMedicineId.ids, id];
      setSelectedMedicineId({ "ids": newIds });
    } else {
      // Remove the ID from the list of selected IDs
      const newIds = selectedMedicineId.ids.filter((medId) => medId !== id);
      setSelectedMedicineId({ "ids": newIds });
    }
  };
  useEffect(() => {
    console.log(selectedMedicineId);
  }, [selectedMedicineId]);
 ///////////////////////////// delete
 const handleDelete = async () => {
  let token = localStorage.getItem("userToken");

  try {
    const response = await fetch(apiUrl + "medicine/products/bulk_delete/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify(selectedMedicineId),
    });
   
   
      const data = await response.json();
      if(data.deleted_count!=0){
        const data = await getMedicine();
     setMedicines(data.medicines);
     setCount(data.count)
      console.log("Products deleted:", data);
      Swal.fire(
        'Good job!',
        'products deleted successfuly!',
        'success'
      )
    } else {
      Swal.fire(
        'sorry!',
        'failed to delete!',
        'error'
      )
    }
  } catch (error) {
    console.error(error);
   
  }
  setSelectedMedicineId({ids:[]})
  console.log(JSON.stringify(selectedMedicineId));
};
 //update
const handleSetActiveDiv = (medicine) => {
  setActiveDiv(medicine.number);
 console.log(medicine.id)
  setInputdata({
    ...inputdata,
     id: medicine.id,
     name:medicine.name,
     name_ar:medicine.name_ar,
     category:[medicine.category],
     price:medicine.price,
     drug:[medicine.drug],
     company:medicine.company,
  });
  
 
};
let {name,name_ar,id,category,company,price,drug}=inputdata;
function fillarr(){
  setInputarr([...inputarr,{name,name_ar,id,category,company,price,drug}])
  
  console.log(inputdata,'input data what we enter')
  setInputdata({name:'',name_ar:'',category:'',company:'',price:'',drug:''})
  
 }

 const handleUpdate = async () => {
  let token = localStorage.getItem("userToken");

  try {
    const response = await fetch(apiUrl + "medicine/products/bulk_patch/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify(updatedData),
    });

   
      const data = await response.json();
   
      if(data.updated!=0){
        const data = await getMedicine();
        setMedicines(data.medicines);
        setCount(data.count)
      console.log("Products updated:", data);
      Swal.fire(
        'Good job!',
        'product updated successfuly!',
        'success'
      )
    } else {
      Swal.fire(
        'sorry!',
        'failed to update!',
        'success'
      )
  }} catch (error) {
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
        onChange={debouncedResults1}
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
      <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
        

  
  



{/*price filter */}
<Box position="absolute" top={110} right={420} m={2}>
<div className="">
      <button className="btn btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {t("filter Price")}
      </button>
     <ul className="dropdown-menu">
      

    <li> 
       {/*price_gt */}
    <input
      placeholder='price__greater than...'
      name='price__gt'
      onChange={fetchData}
      style={{ paddingLeft: '2.5rem' }}
   
    />
      </li>
      <li>
        {/*price_lt */}
      <input
      placeholder='price__lesser than...'
      name='price__lt'
      onChange={fetchData}
      // Add some left padding to make room for the icon
      style={{ paddingLeft: '2.5rem' }}
    />

      </li>


  



  </ul>

  </div>

  </Box>

    {/**languageee */}
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
      {t("products")}
    </Typography>
  </Box>
  </Box>



  <Box position="absolute" top={60} right={60} sx={{ display: 'flex' }}>
      <Box m={2}>
        <Button onClick={prop} variant="contained" color="primary" startIcon={<AddIcon />}>
          {t("New Products")}
        </Button>
      </Box>
      <Box m={2}>
        <Button onClick={handleDelete}  variant="contained" color="primary" >
        {t("delete")}
        </Button>
      </Box>
      <Box m={2}>
        <Button onClick={handleUpdate} variant="contained" color="primary" >
        {t("update")} 
        </Button>
      </Box>
    </Box>
    
    
    < Box  position="absolute" top={110} right={250} m={2}>
  
      <button
        className="btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {t("filter with drugs")}
      </button>
      <ul className="dropdown-menu">
        <li>
        
            <input
              type="text"
              name="categoryMissed"
              onChange={(event) => handleSearchDrugChange(event)}
              placeholder="Search drug name..."
            />
         
        </li>
        {drugArr.map((drug) => (
          <li key={drug.id}>
            <button
              className={`dropdown-item ${anyDrug === drug.id ? "active" : ""}`}
              onClick={() => handleDrugSelect(drug.id)}
            >
              {drug.name}
            </button>
          </li>
        ))}
      </ul>
    
    </Box>

  <Box  position="absolute" top={110} right={60} m={2}>
    
 
    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   {t("filter with Category")}
    </button>
      <ul className="dropdown-menu">
    
      <li>
     
        <input type="text"  name='categoryMissed'  onChange={(event)=>handleSearchInputChange(event)}  placeholder="Search category name..." />
     
      
    </li>



      {catArr.map((category) => (
        <li key={category.id}>
         <button className="dropdown-item" onClick= { ()=>handleCategorySelect(category.id)
        }>
           {category.name}</button>
        </li>
      ))}
    </ul>
  

  </Box>

  






  





    <Box position="absolute" top={150} right={60} m={2}>
      <FilterListIcon onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={ ()=>fetchData ({ordering :'name' , search:val,drug:anyDrug,Category:anyCat})}>name ascending</MenuItem>
        <MenuItem onClick={()=>fetchData ({ordering :'-name', search:val,drug:anyDrug,Category:anyCat})} >name descending</MenuItem>
        <MenuItem onClick={ ()=>fetchData ({ordering :'price' , search:val,drug:anyDrug,Category:anyCat})}> High Price</MenuItem>
        <MenuItem onClick={()=>fetchData ({ordering :'-price', search:val,drug:anyDrug,Category:anyCat})} > Low Price</MenuItem>   
    
       </Menu>
    </Box>



     
   {/**     <div className="input-container" style={{ display: activeDiv === 1 ? 'flex' : 'none', flexDirection: 'column' }}>
  <label htmlFor='name' className='input-label'>Name</label>
  <input className='input-field' value={inputdata.name} type='text' onChange={(event) => setInputdata({ ...inputdata, name: event.target.value })} />
  
  <label htmlFor='name_ar' className='input-label'>Name (Arabic)</label>
  <input className='input-field' value={inputdata.name_ar} type='text' onChange={(event) => setInputdata({ ...inputdata, name_ar: event.target.value })} />

  <label htmlFor='category' className='input-label'>Category</label>
  <input className='input-field' value={inputdata.category} type='text' onChange={(event) => setInputdata({ ...inputdata, category: event.target.value })} />

  <label htmlFor='drug' className='input-label'>Drug</label>
  <input className='input-field' value={inputdata.drug} type='text' onChange={(event) => setInputdata({ ...inputdata, drug: event.target.value })} />

  <label htmlFor='price' className='input-label'>Price</label>
  <input className='input-field' value={inputdata.price} type='text' onChange={(event) => setInputdata({ ...inputdata, price: event.target.value })} />

  <label htmlFor='company' className='input-label'>Company</label>
  <input className='input-field' value={inputdata.company} type='text' onChange={(event) => setInputdata({ ...inputdata, company: event.target.value })} />

  <button onClick={fillarr} className='fill-button'>Fill</button>
</div>
  */}


{/******* */}

















 



  

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

        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Product ID")}</TableCell>
        <TableCell   style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Product Name")}</TableCell>
        <TableCell   style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Product Name(Arabic)")}</TableCell>
        <TableCell   style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Price")}</TableCell>
        <TableCell   style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Category Name")}</TableCell>
        <TableCell   style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Category Name(Arabic)")}</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Category Image")}</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>{t("Drug Name")}</TableCell>
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

      <TableCell align="center"  style={{ padding: '4px' }}>{medicine.id}</TableCell>

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
      align="center"
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
      <TableCell 
        align="center"
        style={{ padding: '4px' }}
      onClick={() => handleEditClick(medicine.id, "price")}>
              {editingId === medicine.id && editingField === "price" ? (
                <input
                  type="number"
                  defaultValue={medicine.price}
                  onBlur={(event) =>
                    handleEditSave(medicine.id, "price", event.target.value)
                  }
                />
              ) : (
                medicine.price
              )}
            </TableCell>

            {medicine.category.length > 0 ? (
              <React.Fragment>
                <TableCell  >{medicine.category.map((category) => category.name).join(", ")}</TableCell>
                <TableCell>{medicine.category.map((category) => category.name_ar).join(", ")}</TableCell>
                <TableCell>
                  {medicine.category.map((category) => (
                    <img
                      src={category.image.image}
                      key={category.id}
                      style={{ width: "50px", marginRight: "5px" }}
                    />
                  ))}
                </TableCell>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
              </React.Fragment>
            )}
            {medicine.drug.length > 0 ? (
              <TableCell>
                {medicine.drug.map((drug) => drug.name).join(", ")}
              </TableCell>
            ) : (
              <TableCell>--</TableCell>
            )}
      



    </TableRow>
  ))}
</TableBody>
  </Table>
  </TableContainer>
</Box>

  



    <div>

    <ReactPaginate 
  previousLabel={'previous'} 
  nextLabel={'next'}
  breakLabel={'...'}
  pageCount={count}
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
  marginPagesDisplayed={1} // show one page number on either side of the current page
  pageRangeDisplayed={1} // show one page number in the middle
/>
     </div>


 </>

  

    
  )
};
