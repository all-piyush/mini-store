import React from 'react'
import { useParams } from 'react-router-dom';
import './ProductDetails.css'
import { FaMinus, FaPlus } from 'react-icons/fa6';

const Productdetails = (props) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const {product,cartproducts,setcartproducts}=props;
    const {id}=useParams();
    const selectedproduct=product.filter((p)=>p.product_id==id);
    console.log(selectedproduct);
    const changecart=async(product, action) =>{
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
function getCount(prod){
  const item=cartproducts.find((p)=>p.product_id===prod.product_id);
  return item?item.count:"";
}

  return (
    <div>
      {selectedproduct && (
        <div className="product-wrapper">
          <img src={selectedproduct[0].image} alt='product-image'></img>
          <div className='product-info'>
          <h2>{selectedproduct[0].name}</h2>
          <p><b>Description: </b>{selectedproduct[0].description}</p>
          <p><b>Subcategory: </b>{selectedproduct[0].subcategory}</p>
          <p><b>Price: </b>${selectedproduct[0].price}</p>
          <div className='addon'><button onClick={()=>{changecart(selectedproduct[0],"remove")}}><FaMinus /></button><b className='count'>{getCount(selectedproduct[0])}</b><button onClick={()=>{changecart(selectedproduct[0],"add")}}><FaPlus /></button></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Productdetails
