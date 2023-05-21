import React, { useState } from 'react'

import 
{
  Paper,
  Box,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  
} from "@mui/material";
import { useLocation } from 'react-router-dom';
const OrderDetails = () => {
    const { state } = useLocation();
    const { medicine } = state;
  
    console.log(medicine)
  
  return (
    <div>
  <Box position="absolute" right={200} left={200} top={200}>
     <Typography variant="h5" style={{ textAlign: 'center' }}>
        order id:{medicine.id}
     </Typography>
     </Box>
    
<Box    sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',

}}>

  <TableContainer component={Paper}
 sx={{ maxWidth: '90%', maxHeight:"70%" ,borderRadius: '10px' }}
>
 <Table aria-label='simple table' 
 stickyHeader
 >
 <TableHead>
      <TableRow>
  
       
      <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}> product ID</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>Product Name </TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>Product Name(Arabic)</TableCell>
        <TableCell align="center"  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>product Image</TableCell>
        
     
      </TableRow>
    </TableHead>
    
    <TableBody>
   {medicine.items.map((med)=>(
    <TableRow key={medicine.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
     

      <TableCell  align="center"  style={{ padding: '4px' }}>{med.product.id}</TableCell>
      <TableCell  align="center"  style={{ padding: '4px' }}>{med.product.name}</TableCell>
      <TableCell  align="center"  style={{ padding: '4px' }}>{med.product.name_ar}</TableCell>
      <TableCell align="center"  style={{ padding: '4px' }}>
      <img
        src={med.product.medicine_images}
          style={{ width: "50px", marginRight: "5px" }}
      />
   
      </TableCell>
     
    
    </TableRow>
   ))}
</TableBody>
  </Table>
  </TableContainer>
</Box>
    </div>
  )
}

export default OrderDetails
