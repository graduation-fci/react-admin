import axios, { Axios } from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
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
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
      <form>

<input
      placeholder='Search...'
      name='search'
      onChange={debouncedResults}
      style={{ paddingLeft: '2.5rem' }} // Add some left padding to make room for the icon
    />
    

</form>



<div className="dropdown">
      <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <FaFilter className='icon'/> {t("ordering")}
      </button>
     <ul className="dropdown-menu">
      

    <li> 
      
      <button className="dropdown-item" name='starts_at' onClick={ ()=>fetchData ({ordering :'name' , search:val})} 
      >
        name ascending
       </button>
       <button className="dropdown-item"  name='ends_at' onClick={()=>fetchData ({ordering :'-name', search:val})} 
      >
       name descending
       </button>
       <button className="dropdown-item"  name='-starts_at' onClick={()=>fetchData ({ordering :'name_ar', search:val})}
      >
        name_ar ascinding
       </button>
       <button className="dropdown-item"   name='-ends_at' onClick={()=>fetchData ({ordering :'-name_ar', search:val})} 
      >
       name_ar descending
       </button>
      </li>

  

  </ul>
 
  </div>

        <div>
         
        <button onClick={prop}  >
      <FaPlus className='icon'/>  {t("create")}
      </button>

        </div>
        <div>
        <button onClick={handleDelete} >
      <FaTrash className='icon'/> {t("delete")}
    </button>
        </div>
        <div>
        <button onClick={handleUpdate} >
    <FaEdit className='icon'/> {t("update")}
    </button>
        </div>


 {/**lang */}
<div className="dropdown">
      <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <FaGlobe className='icon'/>  {t("Language")}
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



    <div   style={{ display: activeDiv === 1 ? 'block' : 'none'}}>
  <label htmlFor='name'>name</label>
 <input  className='cin' value={inputdata.name} type='text' onChange={(event) => setInputdata({ ...inputdata, name: event.target.value })} />
 <label htmlFor='name_ar'>name_ar</label>
 <input  className='cin' value={inputdata.name_ar} type='text' onChange={(event) => setInputdata({ ...inputdata, name_ar: event.target.value })} />
 <button onClick={fillarr}>fill</button>

 </div>
 





    
   


 
   
     
   
      
 
    
  
  
      
  



  


 <table className="table">
    
        <tr>
          <th>{t("category ID")}</th>
          <th>{t("category Name")}</th>
          <th>{t("category Name(Arabic)")}</th>
         
          <th>{t("delete")}</th>
        </tr>
     
      <tbody>
        {medicines.map((medicine) => (
          <tr key={medicine.id}>
            <td style={{ width: "50px" }}>{medicine.id}</td>
            <td
              onClick={() => handleEditClick(medicine.id, "name")}
            >
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
            <td
              onClick={() => handleEditClick(medicine.id, "name_ar")}
            >
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
            {/*<td>
              <button
                className="update-btn"
                onClick={() => {
                  handleSetActiveDiv({
                    id: medicine.id,
                    name: medicine.name,
                    name_ar: medicine.name_ar,
                    number: 1,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {t("Update")}
              </button>
            </td>*/}
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
          </tr>
        ))}
      </tbody>
    </table>




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
