import './App.css';
import {Routes,Route, useLocation} from 'react-router-dom';
import { useState,useEffect } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Collections from './components/Collections';
import Login from './components/Login';
import Cart from './components/Cart';
import Productdetails from './components/Productdetails';
import Checkout from './components/Checkout';
function App() {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const[product,setproducts]=useState([]);
  const[cartproducts,setcartproducts]=useState([]);
  const [loggedin,setloggedin]=useState(false);
    async function fetchcart() {

      const response=await fetch(`${apiKey}/api/v1/getcart`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
        credentials:'include',
      })
      const result=await response.json();
      if(result.success){
        setcartproducts(result.data);
      }
      else{
        setcartproducts([]);
      }
  }
  async function fetchproducts() {
     const response=await fetch(`${apiKey}/api/v1/getproducts`,{
      method:"GET",
      headers:{"Content-type":"application/json"},
      credentials:'include'
    })
    return await response.json();
  }
  useEffect(()=>{fetchproducts().then(data=>setproducts(data.products));},[])
  useEffect(()=>{
    const checkauth=async()=>{
      try{
        const res=await fetch(`${apiKey}/api/v1/check-auth`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
        credentials:'include',
      })
      if(res.ok){setloggedin(true);}
      }
      catch(error){
        setloggedin(false);
      }
    }
    checkauth();
  },[]);
  useEffect(()=>{fetchcart()},[loggedin])
  return (
    <div className="App">
      
      <Navbar loggedin={loggedin} setloggedin={setloggedin}></Navbar>

      <Routes>
        <Route path='/' element={<Home product={product}></Home>}></Route>
        <Route path='/Collections' element={<Collections product={product} cartproducts={cartproducts} setcartproducts={setcartproducts}></Collections>}></Route>
        <Route path='/Contact' element={<Contact></Contact>}></Route>
        <Route path='/login' element={<Login loggedin={loggedin} setloggedin={setloggedin}></Login>}></Route>
        <Route path='/cart' element={<Cart cartproducts={cartproducts} setcartproducts={setcartproducts}></Cart>}></Route>
        <Route path='/products/:id' element={<Productdetails product={product} cartproducts={cartproducts} setcartproducts={setcartproducts}></Productdetails>}></Route>
        <Route path='/checkout' element={<Checkout cartproducts={cartproducts}></Checkout>}></Route>
      </Routes>
    </div>
  );
}

export default App;