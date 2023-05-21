import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';

const Reset = () => {
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Paper
      component="form"
      sx={{ p: '2rem', maxWidth: '30%',maxHeight:'40%',height:'100%' , width: '100%' }}
    > 
      <Box m={2}> <Typography>
        please enter yout Email associated with your account to reset password.
       </Typography></Box>
     <Box m={2}>
       <TextField   id="Email"
       label="Email"
        variant="outlined" style={{ marginBottom: '16px', width: '100%' }}  
       
        InputProps={{
          style: {
            height: '50px' // Set to your preferred height
          }
        }} //onChange={getUser} 
        type='Email' placeholder= 'Enter The Email'
          name='Email'
       
          />
          </Box>
           <Box  m={2} >
        <Button type='submit' variant="contained" color="primary" style={{width:'100%'}} > Continue</Button>
         </Box>
         

    </Paper>
  </Box>
  )
}

export default Reset
