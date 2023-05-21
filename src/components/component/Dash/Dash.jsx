import React ,{useState} from 'react'
import 
{
  Grid, 
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
import './Dash.css'



function Dash() {
  

  const handleClick = () => {
    console.log('Welcome to Material-UI!');
  };
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
  




    {/**texttt */}
    <Box sx={{ position: 'relative' }}>
  <Box position="absolute" top={40} left={60} m={2}>
    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
      Products
    </Typography>
  </Box>
  <Box display="flex" alignItems="center" position="absolute" top={90} left={40} m={2}>
    <Button variant="text" style={{ textTransform: 'none', marginRight: '16px', color: '#212121' }}>
      All
    </Button>
    <Button variant="text" style={{ textTransform: 'none', marginRight: '16px', color: '#212121' }}>
      Publisher
    </Button>
    <Button variant="text" style={{ textTransform: 'none', color: '#212121' }}>
      Draft
    </Button>
  </Box>
</Box>
      <Box  position="absolute" top={60} right={60} m={2} >
     <Button  onClick={handleClick} variant="contained" color="primary" startIcon={<AddIcon />}>
       New ebook
    </Button>
     </Box>
    
     {/**icon */}
     
 <Box position="absolute" top={120} right={60} m={2}>
      <FilterListIcon />  
    </Box>
    
<Box    sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',

}}>
<TableContainer component={Paper}
 sx={{ maxWidth: '90%', borderRadius: '10px' }}
>
 <Table aria-label='simple table' 
 stickyHeader
 >
 <TableHead>
      <TableRow>
      <TableCell style={{ backgroundColor: '#f5f5f5', padding: '4px' }}>
  <FormGroup>
    <FormControlLabel
      control={<Checkbox />}
      sx={{ mr: 0, ml: '-12px', transform: 'scale(0.8)' }}
    />
  </FormGroup>
</TableCell>
       
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>ID</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }}>FirstName</TableCell>
        <TableCell style={{ backgroundColor: '#f5f5f5' ,padding:'4px'}}>LastName</TableCell>
        <TableCell  style={{ backgroundColor: '#f5f5f5',padding:'4px' }} align='center'>Email</TableCell>
      </TableRow>
    </TableHead>
    
    <TableBody>

<TableRow sx={{'&:last-child  td , &:last-child th' :{ border:0 }}}>

<TableCell style={{padding:'4px'}}  >
  <FormGroup>
      <FormControlLabel control={<Checkbox    />}
      sx={{ mr: 0, ml: '-12px', transform: 'scale(0.8)' }}
      />
  </FormGroup>
</TableCell>
<TableCell style={{padding:'4px'}} >  24</TableCell>
<TableCell style={{padding:'4px'}} >hassan</TableCell>
<TableCell style={{padding:'4px'}} >ahmed</TableCell>
<TableCell align='center' style={{ padding: '4px' }}>
  <Box sx={{ bgcolor: 'text.disabled', color: 'primary.contrastText', p: 1, display: 'inline-block',borderRadius:1 }}>
   disabled
  </Box>
</TableCell>
</TableRow>








    </TableBody>
  </Table>
  </TableContainer>
  </Box>
  
  </>
  )
}

export default Dash
