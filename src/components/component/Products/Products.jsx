import axios from 'axios';
import React,{useState , useEffect} from 'react'
import { FaWindowClose } from 'react-icons/fa/index.esm';
import { FaEdit } from 'react-icons/fa/index.esm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import {storage} from '../FireBase'
import {ref , uploadBytes , getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
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


  <div>
    
    <div className='Medicine'>
    
      <input type="text" autoComplete='off' name='name' value={inputdata.name} onChange={handleChange} placeholder='Enter The Name ' />
      <input type="text" autoComplete='off' name='name_ar' value={inputdata.name_ar} onChange={handleChange} placeholder='Enter The name_ar ' />
      <input type="text" autoComplete='off' name='inventory' value={inputdata.inventory} onChange={handleChange} placeholder='Enter The inventory ' pattern="[0-9]*" />
     
    
      <input type="text" autoComplete='off' name='price' value={inputdata.price} onChange={handleChange} placeholder='Enter The price ' />
      
      <input type="text" autoComplete='off' name='company' value={inputdata.company} onChange={handleChange} placeholder='Enter The company ' />
      <input type="text" autoComplete='off' name='parcode' value={inputdata.parcode} onChange={handleChange} placeholder=' The parcode ' />
      <div>
      <label htmlFor="image-input">Choose an image:</label>
      <input type="file" onChange={(e) => setImageFiles(e.target.files)} multiple />
      <button onClick={handleUpload} >upload</button>
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




    <button onClick={fillarr}>add</button>
     

   </div>


   
    
  
    <div className='Med'>
 
<table border={1} cellPadding={10} width={30}>
 <tbody>
 <tr>
    <th>name</th>
    <th>name_ar</th>
    <th>category</th>
    <th>price</th>
    <th>drug</th>
    <th>company</th>
    <th>parcode</th>
    <th> image_files</th>
    <th>delete</th>
    <th>update</th>
 </tr>
   

  

 

   
    {
      inputarr.map
       ((info,index)=>{
        return(
          <tr key={index}>
           <td>{info.name}    
             </td> 
             <td>{info.name_ar}</td>
             <td>{info.category}</td>
             <td>{info.price}</td>
             <td>{info.drug}</td>
             <td>{info.company}</td>
             <td>{info.parcode}</td>
             <td>{info.image_files}</td>
             <td><FaWindowClose  className='icon' onClick={()=>{deleteRow(index)}} style={{ color: 'red'}}/> </td>
             <td>
             <FaEdit className='icon' onClick={() => handleEdit(index)}/></td>
            
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
   </div>

    
    
  
   
  
   
  

  

   
 </>
  
     
    
  )
      }
export default Products