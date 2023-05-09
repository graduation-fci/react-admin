import axios, { Axios } from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
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
  let apiUrl='http://127.0.0.1:8000/store/orders/';
  
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
      let response= await axios.get(apiUrl,{
        headers:{
          Authorization: 'JWT ' + token
        }})   
   
     setMedicines(response.data);
     
    
     console.log(response.data)
     
     

} 


  
 useEffect(()=> {getMedicine();
} ,[]);
 
 const fetchMedicines= async(currentPage)=>{
 let token= localStorage.getItem("userToken")
      let resp= await axios.get(`http://127.0.0.1:8001/store/orders/?page=${currentPage}`,{
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
  let url = `${baseUrl}?${getQueryString(queryParams)}`;
    let token= localStorage.getItem("userToken")
    let response = await axios.get(url,{
      headers:{
        Authorization: "JWT " + token,
      }}) 
setMedicines(response.data);



  }



  function getQueryString( params){
    const map = new Map(Object.entries(params));
    return [...map]
    .map(([key,value])=>`${key}=${encodeURIComponent(value)}`).join('&')
  }
   
// improve performance
  const handleChange= (e) =>fetchData ({search : e.target.value},{year:yeear});
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
    fetch( `http://127.0.0.1:8001/store/orders/${currentId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'JWT ' + token
        },
        body: JSON.stringify( inputdata )
      })
 
   
    } 
   
   
   
   
 

  

 


  
  return (   
  
    
    <>
    

   
<div   style={{ display: activeDiv === 1 ? 'block' : 'none'}}>
  
 <label htmlFor='order_status'>order_status</label>
 <input  className='cin' value={inputdata.order_status} type='text' onChange={(event) => setInputdata({ ...inputdata, order_status: event.target.value })} />
 <button onClick={fillarr}>fill</button>

 </div>

      

   
    
 
    <div className="container">
     


 
     <div className="d-flex justify-content-end">
  

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
   </div>

  </div>
  
  <div className='container'>
  <div className='d-flex justify-content-start position-relative'>
    <input
      placeholder='Search...'
      name='search'
      onChange={debouncedResults}
      style={{ paddingLeft: '2.5rem' }} // Add some left padding to make room for the icon
    />
    <span className="fa fa-search form-control-feedback  justify-content-start   position-absolute" style={{ left: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}></span>
  </div>
</div>


<div>
      <label htmlFor="year-dropdown">Filter by year:</label>
      <select id="year-dropdown"  onClick={(e)=>fetchData({year:e.target.value})} >
        <option value="">All years</option>
        {years.map((year) => (
          <option key={year} value={year} >
            {year}
          </option>
        ))}
      </select>
    </div>
   
  
  

  <div className="container">
     <div className="d-flex justify-content-start">
   
     <div className="dropdown">
      <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <FaFilter className='icon'/> {t("Filter")}
      </button>
     <ul className="dropdown-menu">
      

    <li> 
      
      <button className="dropdown-item" name='starts_at' onClick={ ()=>fetchData ({order_status :'PEN' , search:val,year:yeear})} 
      >
        Order_pending
       </button>
       <button className="dropdown-item"  name='ends_at' onClick={()=>fetchData ({order_status :'COM', search:val,year:yeear})} 
      >
       Order_completed
       </button>
       <button className="dropdown-item"  name='-starts_at' onClick={()=>fetchData ({order_status :'CON', search:val,year:yeear})}
      >
       Order_confirmed
       </button>
       <button className="dropdown-item"   name='-ends_at' onClick={()=>fetchData ({order_status :'CAN', search:val,year:yeear})} 
      >
        Order_canceled
       </button>
       <button className="dropdown-item"   name='-ends_at' onClick={()=>fetchData ({ ordering:'placed_at',  search:val,year:yeear})} 
      >
        placed_at ascend
       </button>
       <button className="dropdown-item"   name='-ends_at' onClick={()=>fetchData ({ ordering:'-placed_at',   search:val,year:yeear})} 
      >
        placed_at descend
       </button>
      </li>

  

  </ul>
 
  </div>
   </div>
  </div>

  
   
  

  
  <div className="card-container">
      {medicines.map((medicine) => (
        <div key={medicine.id} className="card">
          <div className="card-header">
            <span>{t("Order ID")}:</span> {medicine.id}
          </div>
          <div className="card-body">
            <div>
              <span>{t("Customer ID")}:</span> {medicine.customer}
            </div>
            <div>
              <span>{t("Order Status")}:</span> {medicine.order_status}
            </div>
            <div>
              <span>{t("Total Price")}:</span> {medicine.total_price}
            </div>
            <div>
              <span>{t("placed_at")}:</span> {medicine.placed_at}
            </div>
            <div>
              <span>{t("Payment_Method")}:</span> {medicine.payment_method}
            </div>
            {selectedOrder === medicine.id && (
              <div>
                <div>
                    <span>City: </span>{medicine.address.city}
                </div>
                <div>
                    <span>Street: </span>{medicine.address.street}
                </div>
                <div>
                    <span>Description: </span>{medicine.address.description}
                </div>
                <div>
                    <span>Phone: </span>{medicine.address.phone}
                </div>
                <div>
                    <span>Type: </span>{medicine.address.type}
                </div>
                <div>
                    <span>Title: </span>{medicine.address.title}
                </div>
                <div>
                    <h4> -Items</h4>
                </div>
                <div>
                    <span>Items_ID: </span>{medicine.items[0].id}
                </div>
                <div>
                    <span>Items_quantity: </span>{medicine.items[0].quantity}
                </div>
                <div>
                    <span>Unit_price: </span>{medicine.items[0].unit_price}
                </div>
                <div>
                    <span>Product_ID: </span>{medicine.items[0].product.id}
                </div>
                <div>
                    <span>Name: </span>{medicine.items[0].product.name}
                </div>
                <div>
                    <span>Name_ar: </span>{medicine.items[0].product.name_ar}
                </div>
                <div>
                    <span>Product_Price: </span>{medicine.items[0].product.price}
                </div>
                <div>
                    <span>Product_ID: </span>{medicine.items[0].product.id}
                </div>
                <div>
                <button onClick={() => (handleSetActiveDiv({id: medicine.id, order_status: medicine.order_status, number: 1}), setCurrentId(medicine.id))}> update</button>
                </div>
              </div>
            )}
          </div>
          <div className="card-footer">
          <button className="update-btn" onClick={() => handleDetailsClick(medicine.id)}>
               {selectedOrder === medicine.id ? t("Close Details") : t("Details")}
           </button>
          </div>
        </div>
      ))}
    </div>





 



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
