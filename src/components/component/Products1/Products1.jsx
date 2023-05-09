import axios, { Axios } from 'axios'
import React, { useRef , useEffect, useMemo, useState } from 'react'
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

 
 
   
     async function getMedicine(){
      let token= localStorage.getItem("userToken")
      let response= await axios.get(apiUrl+'medicine/products/',{
     headers:{
      Authorization: 'JWT ' + token
     }}) 
   
     setMedicines(response.data.results);
     
    console.log(response.data.results[0]);
     console.log(medicines)
     

} 


  
 useEffect(()=> {getMedicine();
} ,[]);
 
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


const handleDrugSelect = (drug) => {
  setAnyDrug(drug.id);
  fetchData({ drug: drug.id });
};

   //filter*************
   async function fetchData({ search, ordering } ) {
    let baseUrl = apiUrl;
    let queryParams = {};
    if(anyCat!=null){
      queryParams['category']=anyCat;
    }

    if (anyDrug != null) {
      queryParams["drug"] = anyDrug;
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
        getMedicine()
      console.log("Products deleted:", data);
      alert("Selected products have been deleted successfully.");
    } else {
      alert("Failed to delete selected products.");
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
        getMedicine()
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
  
  return (   
  
    
     


    <>

<nav>
      <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
      placeholder='Search...'
      name='search'
      onChange={debouncedResults1}
      style={{ paddingLeft: '2.5rem' }} // Add some left padding to make room for the icon
     />
   {/**filter category */}
     

  
  <div className="dropdown category-dropdown">
    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   {t("filter with Category")}
    </button>
      <ul className="dropdown-menu">
    
      <li>
      <div className="input-group mb-3">
        <input type="text"  name='categoryMissed'  onChange={(event)=>handleSearchInputChange(event)}  placeholder="Search by category name..." />
     
      </div>
    </li>



      {catArr.map((category) => (
        <li key={category.id}>
         <button className="dropdown-item" onClick={() => { fetchData({category : category.id})
         setAnycat(category.id);
        }}>
           {category.name}</button>
        </li>
      ))}
    </ul>
  
</div>
{/* filter with drugs */}
<div className="dropdown drug-dropdown">
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
          <div className="input-group mb-3">
            <input
              type="text"
              name="categoryMissed"
              onChange={(event) => handleSearchDrugChange(event)}
              placeholder="Search by category name..."
            />
          </div>
        </li>
        {drugArr.map((drug) => (
          <li key={drug.id}>
            <button
              className={`dropdown-item ${anyDrug === drug.id ? "active" : ""}`}
              onClick={() => handleDrugSelect(drug)}
            >
              {drug.name}
            </button>
          </li>
        ))}
      </ul>
    </div>

{/**orderinggg */}

<div className="dropdown">
      <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <FaFilter className='icon'/> {t("ordering")}
      </button>
     <ul className="dropdown-menu">
      

    <li> 
      
      <button className="dropdown-item" name='starts_at' onClick={ ()=>fetchData ({ordering :'name' , search:val , price__gt:gt,price__lt:lt})} 
      >
         ascending
       </button>
       <button className="dropdown-item"  name='ends_at' onClick={()=>fetchData ({ordering :'-name', search:val, price__gt:gt,price__lt:lt})} 
      >
        descending
       </button>
       <button className="dropdown-item"  name='-starts_at' onClick={()=>fetchData ({ordering :'price', search:val, price__gt:gt,price__lt:lt})}
      >
       high price
       </button>
       <button className="dropdown-item"   name='-ends_at' onClick={()=>fetchData ({ordering :'-price', search:val, price__gt:gt,price__lt:lt})} 
      >
         low price
       </button>
      </li>

  

  </ul>
 
  </div>
{/*price filter */}
<div className="dropdown">
      <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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


  {/**buttons */}
  <div>
  <button onClick={prop} className='    ' >
      <FaPlus className='icon'/>  {t("create")}
      </button>  
       </div>
      <div> 
        <button onClick={handleDelete} className='   '>
      <FaTrash className='icon'/> {t("delete")}
    </button>
     </div>
    <div>
      <button onClick={handleUpdate} className='   '>
    <FaEdit className='icon'/> {t("update")}
    </button> 
    </div>

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

















 



  

  

  

  

<table className="table">
     
        <tr>
          <th>{t("product ID")}</th>
          <th>{t("product Name")}</th>
          <th>{t("product Name_ar")}</th>
          <th>{t("price")}</th>
          <th>{t("category Name")}</th>
          <th>{t("category Name(Arabic)")}</th>
          <th>{t("category image")}</th>
          <th>{t("drug Name")}</th>
         
          <th>{t("select")}</th>
        </tr>
     
      <tbody>
        {medicines.map((medicine) => (
          <tr key={medicine.id}>
            <td style={{ width: "50px" }}>{medicine.id}</td>
            <td onClick={() => handleEditClick(medicine.id, "name")}>
              {editingId === medicine.id && editingField === "name" ? (
                <input
                  type="text"
                  defaultValue={medicine.name}
                  onBlur={(event) =>
                    handleEditSave(medicine.id, "name", event.target.value)
                  }
                />
              ) : (
                medicine.name
              )}
            </td>
            <td onClick={() => handleEditClick(medicine.id, "name_ar")}>
              {editingId === medicine.id && editingField === "name_ar" ? (
                <input
                  type="text"
                  defaultValue={medicine.name_ar}
                  onBlur={(event) =>
                    handleEditSave(medicine.id, "name_ar", event.target.value)
                  }
                />
              ) : (
                medicine.name_ar
              )}
            </td>
            <td onClick={() => handleEditClick(medicine.id, "price")}>
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
            </td>
            {medicine.category.length > 0 ? (
              <React.Fragment>
                <td  >{medicine.category.map((category) => category.name).join(", ")}</td>
                <td>{medicine.category.map((category) => category.name_ar).join(", ")}</td>
                <td>
                  {medicine.category.map((category) => (
                    <img
                      src={category.image.image}
                      key={category.id}
                      style={{ width: "50px", marginRight: "5px" }}
                    />
                  ))}
                </td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td>--</td>
                <td>--</td>
                <td>--</td>
              </React.Fragment>
            )}
            {medicine.drug.length > 0 ? (
              <td>
                {medicine.drug.map((drug) => drug.name).join(", ")}
              </td>
            ) : (
              <td>--</td>
            )}
            <td>
              <button
                className={
                  selectedMedicineId.ids.indexOf(medicine.id) !== -1
                    ? "selected"
                    : "select-btn"
                }
                onClick={() => handleSelectMedicineId(medicine.id)}
              >
                {t("Select")}
              </button>
            </td>
           {/**  <td>
              <button
                className="update-btn"
                onClick={() => {
                  handleSetActiveDiv({
                    id: medicine.id,
                    name: medicine.name,
                    name_ar: medicine.name_ar,
                    category: medicine.category[0].name,
                    drug: medicine.drug[0].name,
                    price: medicine.price,
                    company: medicine.company,
                    number: 1,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to the top of the page
                }}
              >
                {t("Update")}
              </button>
            </td>*/}
          </tr>
        ))}
      </tbody>
    </table>


    <div>

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
     </div>


 </>

  

    
  )
};
