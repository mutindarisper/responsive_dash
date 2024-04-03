// import { VisibilityOff, Visibility } from '@mui/icons-material'

import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
// import forest from '../../assets/images/forest.jpg'
import '../style.css'
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    '& .MuiInputBase-input': {
      backgroundColor: 'white', // Change the background color to white
      fontFamily: 'Poppins',
      borderRadius: '5px',
      color: '#484A48'
    },
  },
});


type Form = {

  username: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>({

    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })


  const handleFormChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value

    })

    console.log(form)

  }

  const handleLogin = () => {
    navigate('/mapviewer')
  }




  return (
    <div className="signup d-flex  bg-image-signup-container  mb-5" style={{ width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>


      <div className="wrapper">

        <Stack spacing={2}  >

          <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '2em' }} >Login</p>
          
          <FormControl sx={{ m: 1, }} variant="standard">
            {/* <InputLabel htmlFor="standard-adornment-password">Email</InputLabel> */}
            <TextField
              id="standard-adornment-password"
              type='email'
              name='email'
              variant="filled"
              label="Email"
              InputProps={{
                className: classes.root,
              }}
              InputLabelProps={{
                style: { fontFamily: 'Poppins' } // Change the font family of the label to Poppins
              }}
              onChange={handleFormChange}

            />
          </FormControl>
          <FormControl sx={{ m: 1, }} variant="standard">
            {/* <InputLabel htmlFor="standard-adornment-password">Password</InputLabel> */}
            <TextField
              id="standard-adornment-password"
              type='password'
              name='password'
              variant="filled"
              label="Password"
              InputProps={{
                className: classes.root,
              }}
              InputLabelProps={{
                style: { fontFamily: 'Poppins' } // Change the font family of the label to Poppins
              }}
              onChange={handleFormChange}

            />
          </FormControl>
          
          <Button variant="contained" color="success"
            style={{
              textTransform: 'none',
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: '1.5em',
              height: '3em',
              padding: '1em',
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <p onClick={() => navigate('/forgot')}>Forgot Password?</p>
        </Stack>
      </div>
    </div>
  )
}

export default Login