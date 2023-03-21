import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'

const Login = () => {
  const navigate=useNavigate()
  const[formerr,setformerr]=useState({})
  const sendRequest=async()=>{
   let res=await axios.post(`http://localhost:5000/login`,{
      email:inputs.email,
      password:inputs.password
    }).catch(err=>console.log(err))
    const data= await res.data
    console.log(data);
    return data
  }

  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  const handelChange=(e)=>{
    setinputs((prevstate)=>({
        ...prevstate,
        [e.target.name]:e.target.value
    }))
  }
  const handelSubmit=(e)=>{
     e.preventDefault();
      setformerr(fromvalidation(inputs))
       sendRequest().then(()=>navigate("/home"))
       .then((data)=>localStorage.setItem("userId",data.user._id))
       
    
  }
  const fromvalidation=(values)=>{
    const error={}
      if(!values.email){
       error.email="email is require"
      }
      if(!values.password){
       error.password="password is require"
      }
      return error
  }
  return (
    <div>
       <Header />
      <form onSubmit={handelSubmit}>
        <Box
          maxWidth={350}
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography padding={3} textAlign="center" variant="h3">
          Login
          </Typography>
         
          <TextField
            onChange={handelChange}           
            value={inputs.email}
            margin="normal"
            placeholder="Email"
            type={"email"}
            name="email"
          />
          <p style={{color:"red"}}>{formerr.email}</p>
          <TextField
            onChange={handelChange}
            value={inputs.password}
            margin="normal"
            placeholder="Password"
            type={"password"}
            name="password"
          />
          <p style={{color:"red"}}>{formerr.password}</p>
          <Button
            type="submit"
            color="warning"
            sx={{ borderRadius: 3, mt: 3 }}
            variant="contained"
          >
            Login
          </Button>
          <Button
            LinkComponent={Link} to="/signup"
            sx={{ borderRadius: 3, mt: 3 }}
          >
            change to signup
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login
