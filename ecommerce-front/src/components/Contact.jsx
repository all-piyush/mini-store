import React from 'react'
import './Contact.css'
const Contact = () => {
  return (
    <div id="contact">
      <div className='heading'>Contact<span>Us <hr className='center-line' /></span></div>
      <div className='content'>
        <img src="https://res.cloudinary.com/dfislatvt/image/upload/v1761028934/img6_jajm4h.webp" alt='img6'></img>
        <div className='touch'>
          <div>
          <p><b>Our store</b></p>
          <p>Plot No. 456, 12th Main, HSR Layout Sector 7,Bengaluru, Karnataka 560102</p>
          </div>
          <p><b>Tel:</b> connect us directly <b>+91 9900138830</b></p>
          <p> <b>Email:</b> Connect with us through mail <b>pureform@gmail.com</b></p>
          <p><b>Instagram:</b> Connect with us through our instagram handle <b>Pure_Form</b></p>
          <p><b>Facebook:</b>Connect with us through our facebook handle <b>Pure_Form</b></p>
        </div>
      </div>
    </div>
  )
}

export default Contact
