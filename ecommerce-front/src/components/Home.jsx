import React, { useEffect, useState } from 'react'
import './Home.css'
import { TbTruckDelivery } from 'react-icons/tb';
import { MdCached } from 'react-icons/md';
import { HiEmojiHappy } from 'react-icons/hi';
const Home = (props) => {
  const product=props.product;
  const[latest,setlatest]=useState([]);
  const[bestseller,setbestseller]=useState([]);
  useEffect(()=>{
    let filterbsetseller=product.filter((prod)=>prod.bestseller===true);
    filterbsetseller=filterbsetseller.slice(0,4);
    let bestsellers=product.sort((prod1,prod2)=> prod1.date-prod2.date);
    bestsellers=bestsellers.slice(0,4);
    setbestseller(bestsellers);
    setlatest(filterbsetseller);
    
  },[product]);
  return ( 
    <div id="home">
      <div className='home-images'>
      <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1761028939/img1_ungptf.jpg" alt="img1"/>
      <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1761028938/img2_m7aayr.webp" alt="img1"/>
      <p className='text1'>Be The Trend </p>
      <p className='text2'>Setter</p>
      <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1761028937/img3_v5ovvc.jpg" alt="img1"/>
      <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1761028937/img4_gz8pwz.jpg" alt="img1"/>
      </div>
      <div className="container">
        <div className='first'>Latest <span>Products  <hr className='center-line' /></span></div>
        <p>Our Latest Products To Make You Look More Trendy And Fashionable </p>
        

        <div className='product'>
        {bestseller.map((prod)=>{
          return <div className='home-card' key={prod.product_id}>
            <img src={prod.image} alt="img"></img>
            <h4 className='homeh4'>{prod.name}</h4>
            <div>${prod.price}</div>
            </div>
        })}
        </div>
      </div>
      <div className="container">
        <div className='first'>Best <span>Sellers <hr className='center-line' /></span></div>
        <p>Our Best Selling Products To Give You Amazing Looks</p>
        <div className='product'>
        {latest.map((prod)=>{
          return <div className='home-card' key={prod.product_id}>
            <img src={prod.image} alt="img"></img>
            <h4 className='homeh4'>{prod.name}</h4>
            <p>${prod.price}</p>
            </div>
        })}
        </div>
      </div>
      <div id="benefits-heading">Our Benefits <hr className='center-line' /></div>
      <div id="benefits">
        <div className='benefits-text'><TbTruckDelivery className='benefits-icon'/><span>Free Shipping on order above 799</span></div>
        <div className='benefits-text'><MdCached  className='benefits-icon'/><span>Easy Return and Exchange within 10 days</span></div>
        <div className='benefits-text'><HiEmojiHappy className='benefits-icon'/><span>Thousands of Happy Customers</span></div>
      </div>
    </div>
  )
}
export default Home
