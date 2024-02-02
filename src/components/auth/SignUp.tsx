import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel  } from '@mui/material'
import React, {useEffect, useState} from 'react'
import ParentComponent from '../ParentComponent'



type Form = {
        firstName: string,
        lastName:string,
        email:string,
        password:string,
        confirmPassword:string,
}

const SignUp = () => {
    const [form, setForm] = useState<Form>({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    })
    

    const handleFormChange = (e:any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        })

        console.log(form)

    }


    
    
  return (
    <div>
        <Box>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">FirstName</InputLabel>
          <Input
            id="standard-adornment-password"
            name='firstName'
            type='text'
            onChange={handleFormChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                 
                 
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">LastName</InputLabel>
          <Input
            id="standard-adornment-password"
            name='lastName'
            type='text'
            onChange={handleFormChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                 
                 
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            id="standard-adornment-password"
            type='email'
            name='email'
            onChange={handleFormChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
             
                 
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type='password'
            name='password'
            onChange={handleFormChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                 
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
          <Input
            id="standard-adornment-password"
            type='password'
            name='confirmPassword'
            onChange={handleFormChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                 
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </Box>

        <ParentComponent />

    </div>
  )
}

export default SignUp