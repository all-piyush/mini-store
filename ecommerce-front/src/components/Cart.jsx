import  { useState,useEffect} from 'react'
import './Cart.css'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const Cart = (props) => {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const navigate=useNavigate();
   const[total,settotal]=useState(0);
  const cartproducts=props.cartproducts;
  const setcartproducts=props.setcartproducts;

  const changecart=async(product, action)=> {
  setcartproducts((prevCart) => {
    const existing = prevCart.find((p) => p.product_id === product.product_id);
    if (action === "add") {
      async function addprod(){
        await fetch(`${apiKey}/api/v1/addproduct`,{
            method:"PUT",
            headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({id:product.product_id}),
        credentials:'include'
      })
    }
    addprod();
          if (existing) {
          return prevCart.map((p) =>
          p.product_id === product.product_id ? { ...p, count: p.count + 1 } : p
        );
      } else {
          return [...prevCart, { ...product, count: 1 }];
      }
  }

    if (action === "remove") {
      async function delproduct(){
        await fetch(`${apiKey}/api/v1/deleteproduct`,{
          method:"PUT",
          headers:{'Content-Type': 'application/json',},
          body:JSON.stringify({id:product.product_id}),
        credentials:'include'
        })
      }
      delproduct();
      
      if (existing && existing.count > 1) {
        return prevCart.map((p) =>
          p.product_id === product.product_id ? { ...p, count: p.count - 1 } : p
        );
      } else {
        return prevCart.filter((p) => p.product_id !== product.product_id);
      }
    }

    return prevCart;
  });
}
useEffect(() => {
    const newTotal = cartproducts.reduce((acc, item) => acc + item.price * item.count, 0);
    settotal(newTotal);
  }, [cartproducts]);
  return (
    <div id="checkout">
    <div id="cart">
      <div className='heading'>Your <span>Shopping Cart <hr className='center-line' /> </span></div>
      <div className='cart-body'>
        <div className='cart-items'>
          {
            cartproducts.map((prod)=>{
              return <div className='card'>
                  <img src={prod.image} alt="prod-image"/>
                  <h4 className='prod-about'>{prod.name}</h4>
                  <h4 className='prod-about'>${prod.price}</h4>
                  <div className='addon'><button onClick={()=>changecart(prod,"remove")}><FaMinus /></button><p> {prod.count} </p><button onClick={()=>changecart(prod,"add")}><FaPlus /></button></div>
                  </div>
            })
          }
        </div>
      </div>
    </div>
    <div className='cart-bill'>
      <b className='heading'>Cart <span>Total <hr className='center-line' /> </span></b>
      <div className='billrow'><p>SubTotal</p><p>${total}</p></div><hr/>
      <div className='billrow'><p>Shipping Fee</p><p>$5</p></div><hr/>
      <div className='billrow'><p>Total</p><b>${total+5}</b></div>
      <button className='checkout' onClick={()=>{navigate('/checkout');}}>Proceed To CheckOut</button>
        
    </div>
  </div>
  )
}

export default Cart
