import React from 'react'
import { useMutation } from 'react-query'
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/system'
import { useForm, useWatch } from 'react-hook-form'
import { Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit, formState: { errors }, control} = useForm({ mode: 'all' })
  const email = useWatch({control, name:"email"}) 
  const password = useWatch({control, password:"password"})
  const {isLoading, error, mutate, isSuccess} = useMutation( 'repoData',async()=>{
    const res = await fetch("https://api.examapleapicalls.com/login",{
      method:"POST",
      body: JSON.stringify({email, password}),
      headers:{"Content-Type": 'application/json'}
    })
    const response = res.json()
    return response
  })
  const onSubmit = (data) => {
  mutate();
  console.log(data)
  }
  return (

    <Box display="flex" flexDirection={"column"} maxWidth={300} margin="auto" marginTop={5}  >
      <form onSubmit={handleSubmit(onSubmit)} >
        <Typography textAlign={"center"} variant='h3' marginBottom={3}>
          Login
        </Typography>
        <TextField fullWidth id="outlined-basic" label="Email" variant='outlined' margin='normal' type="email" name='email'   {...register("email", {
          required: "email should be provided", pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "email should be valid forms "

          }
        })} />
        <Typography color="#f50057"  >{errors.email?.message}</Typography>
        <TextField fullWidth id="outlined-basic" label="Password" variant='outlined' margin='normal' type="password"   name='password'   {...register("password", {
          required: "password should be provided", minLength: {
            value: 6,
            message: "Password should be atleast 6 character long"
          }
        })} />
        <Typography color="#f50057">{errors.password?.message}</Typography>

        <FormControlLabel margin='normal' value="remember" control={<Checkbox defaultChecked />} label="Remember me" />
        <Button type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }} >Login</Button>
          { isLoading && <CircularProgress/>  }
          { error && <Typography display="flex" marginBottom={2} color="red" alignItems={"center"}><ErrorIcon sx={{color:"red"}}/>somthing went wrong!</Typography>}
          { isSuccess && <Typography display="flex" alignItems={"center"} marginBottom={2} color="greenyellow"><CheckCircleIcon sx={{color:"green"}}/></Typography> }
      </form>
      <Typography>
        Are you new here? <Link to='/signup'> create a new account</Link>
      </Typography>
      <Typography>
        <Link to='/signup'> Forgot password?</Link>
      </Typography>
    </Box>

  )
}

export default Login
