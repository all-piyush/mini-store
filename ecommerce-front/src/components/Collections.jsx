import React, { useState, useEffect } from 'react'
import './Collections.css'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const Collections = (props) => {
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const product = props.product;
  const cartproducts = props.cartproducts;
  const setcartproducts = props.setcartproducts;
  const [filterproduct, setfilterproduct] = useState([]);
  const [sidebar, setsidebar] = useState(false);
  const [category, setcategory] = useState([]);
  const [type, settype] = useState([]);
  const navigate = useNavigate();
  function catclicked(e) {
    setcategory((prev) => prev.includes(e.target.name) ? prev.filter((c) => c !== e.target.name) : [...prev, e.target.name]);
  }
  function typeclicked(e) {
    settype((prev) => prev.includes(e.target.name) ? prev.filter((t) => t !== e.target.name) : [...prev, e.target.name]);
  }
  function handlesidebar() {
    setsidebar(true);
  }
  const changecart = async (product, action) => {
    setcartproducts((prevCart) => {
      const existing = prevCart.find((p) => p.product_id === product.product_id);
      if (action === "add") {
        async function addprod() {
          await fetch(`${apiKey}/api/v1/addproduct`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: product.product_id }),
            credentials: 'include'
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
        async function delproduct() {
          await fetch(`${apiKey}/api/v1/deleteproduct`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ id: product.product_id }),
            credentials: 'include'
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
  function getCount(prod) {
    const item = cartproducts.find((p) => p.product_id === prod.product_id);
    return item ? item.count : "";
  }
  useEffect(() => {
    const filtered = product.filter(
      (prod) =>
        (category.length === 0 || category.includes(prod.category)) &&
        (type.length === 0 || type.includes(prod.subcategory))
    );
    setfilterproduct(filtered);
  }, [category, type, product]);
  return (

    <div id="collections">
      {sidebar && (
        <div className="overlay" onClick={() => { setsidebar(false) }}></div>
      )}
      <div className={`sidebar ${sidebar ? "show" : "close"}`}>
        <h2>Filters</h2>
        <div className='categories'>
          <h4 >Categories</h4>
          <input type='checkbox' id="men" onChange={catclicked} name="Men"></input>
          <label htmlFor='men'>Men</label><br />
          <input type='checkbox' id="women" onChange={catclicked} name="Women"></input>
          <label htmlFor='women'>Women</label><br />
          <input type='checkbox' id="kids" onChange={catclicked} name="Kids"></input>
          <label htmlFor='kids'>Kids</label>
        </div>
        <div className='type'>
          <h4 >Type</h4>
          <input type='checkbox' id="topwear" onChange={typeclicked} name="Topwear"></input>
          <label htmlFor='topwear'>Topwear</label><br />
          <input type='checkbox' id="bottomwear" onChange={typeclicked} name="Bottomwear"></input>
          <label htmlFor='bottomwear'>Bottomwear</label><br />
          <input type='checkbox' id="accessories" onChange={typeclicked} name="Accessories"></input>
          <label htmlFor='accessories'>Accessories</label>
        </div>
      </div>
      <div className='products'>
        <div className='first-bar'><h2>Collections</h2><button id="filter" onClick={handlesidebar}>filters</button></div>
        <div className='product'>
          {filterproduct.map((prod) => {
            return <div className='card' key={prod.product_id} >
              <img src={prod.image} alt="prod-image" onClick={() => { navigate(`/products/${prod.product_id}`) }} />
              <h4>{prod.name}</h4>
              <p className='price'>${prod.price}</p>
              <div className='addon'><button onClick={() => { changecart(prod, "remove") }}><FaMinus /></button><p className='count'>{getCount(prod)}</p><button onClick={() => { changecart(prod, "add") }}><FaPlus /></button></div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Collections
