import React from 'react'
import './Navbar.css'
import { IoCartSharp } from 'react-icons/io5';
import {NavLink, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
const Navbar = (props) => {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const navigate=useNavigate();
  const logoutfunc=async()=>{
    try{
      const res=await fetch(`${apiKey}/api/v1/logout`, {
                method: "GET",
                credentials: "include" 
            });
            if(res.ok){
                const data=await res.json();
                toast.success(data.message);
                setloggedin(false);
            navigate('/',{replace:true});
            }
            
    }catch(error){
      console.log(error);
    }
    
  }
  const {loggedin,setloggedin}=props;
  return (
    <div id="navbar">
      <div id="navbar-one">
      <NavLink to="/"><img src="https://res.cloudinary.com/dfislatvt/image/upload/v1760785915/ecommerce/dbvhsgddtqavkky0evpw.png" alt="img" className='name'></img></NavLink>
      <div className='navbar'>
        <NavLink to="/" className='links'>Home</NavLink>
        <NavLink to='/Collections' className='links'>Collection</NavLink>
        <NavLink to="/Contact" className='links'>Contact</NavLink>
        </div>
        <div className='icons'>
          {loggedin?(<NavLink to='/'><button className='but2' onClick={logoutfunc}>LOG OUT</button></NavLink>):
            (<NavLink to='/login'><button className='but2' >LOG IN</button></NavLink>)}
            <NavLink to='/cart'><button className='but3'><IoCartSharp></IoCartSharp></button></NavLink>
        </div>
        </div>
        <hr/>
    </div>
  )
}

export default Navbar
