import React, { useState } from 'react'
import './Login.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = (props) => {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
    const navigate=useNavigate();
    const[formdata,setformdata]=useState({"name":"","email":"","password":""});
    const [newuser,setnewuser]=useState(true);
    const{loggedin,setloggedin}=props;
    function changestate(){
        setnewuser((prev)=>!prev);
        setformdata({ name: "", email: "", password: "" });
    }
    function changeform(e){
        const{name,value}=e.target;
        setformdata((prev)=>({...prev,[name]:value}));
    }
    const submitform=async(e)=>{
        e.preventDefault();
        let res=null;
        const usermethod=newuser?"signup":"login";
        
          res=await fetch(`${apiKey}/api/v1/${usermethod}`,{
            method:"POST",
            headers:{'Content-Type': 'application/json',},
            credentials:"include",
            body:JSON.stringify({email:formdata.email,password:formdata.password})
            })
            const data=await res.json();
            if(res.ok){
              toast.success(data.message);
              setloggedin(true);
              navigate('/');
            }
            else{
              toast.error(data.message);
            }
        
        
        setformdata({ name: "", email: "", password: "" });
    }
   
  return (
    <div id="profile">
        
        <div >
            
        {!newuser?
        (<form className='form' onSubmit={submitform}>
            <p className='form-heading'>Log In</p>
            <input type='email' placeholder='Enter Your Email Id' onChange={changeform} value={formdata.email} name="email" required ></input>
        <input type='password' placeholder='Enter Your Password' onChange={changeform} value={formdata.password} name="password" required></input>
        <div className='form-extra'><p>Forgot Password</p><p onClick={changestate}>Create Account</p></div>
        <button type='submit' className='submit-button'>Log In</button>
        </form>)
        :(  <form className='form' onSubmit={submitform}>
            <p className='form-heading'>Sign Up</p>
            <input type='text' placeholder='Enter Your Name' onChange={changeform} value={formdata.name} name="name"required></input>
            <input type='email' placeholder='Enter Your Email Id' onChange={changeform} value={formdata.email} name="email"required></input>
            <input type='password' placeholder='Enter Your Password' onChange={changeform} value={formdata.password} name="password"required></input>
            <div className='form-extra'><p>Forgot Password</p><p onClick={changestate}>Already A User?</p></div>
            <button type="submit" className='submit-button'>Sign Up</button>
            <br/>
            
            </form>
            
        )
    }
    </div>
    
    </div>
  )
}

export default Login
