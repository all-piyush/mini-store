import React from 'react'
import './Checkout.css'
const Checkout = (props) => {
    const {cartproducts}=props;
  return (
    <div className='checkout-page'>
      <h2>Checkout</h2>
      <div className='checkout-body'>
        
        <div className='user-details'>
        <form className='address-form'>
            <h3>Shipping Address</h3>
            <div className='input-wrapper'>
            <label>Enter Your Full Name</label><br/>
            <input type="text" placeholder='Full Name' required></input>
            </div>
            <div className='input-wrapper'>
            <label>Enter Your Address</label><br/>
            <input type="text" placeholder='Address' required></input> 
            </div>
            <div className='input-wrapper'>
            <label>Enter Your City</label><br/>
            <input type="text" placeholder='City' required></input>
            </div>
            <div className='input-wrapper'>
            <label>Enter Your State</label><br/>
            <input type="text" placeholder='State' required></input>
            </div>
            <div className='input-wrapper'>
            <label>Enter Your Country</label><br/>
            <input type="text" placeholder='Country' required></input>
            </div>
            <div className='input-wrapper'>
            <label>Enter Your Pincode</label><br/>
            <input type="text" placeholder='Pincode' required></input>
            </div>
        </form>
        <form className='payment-form'>
            <h3>Payment Details</h3>
            <div className='input-wrapper'>
            <label>Card Number</label>
            <input type="text" placeholder='Card Number' required></input>
            </div>
            <div className='input-wrapper'>
            <label>Card Holder Name</label>
            <input type="text" placeholder='Card Holder Name' required></input>
            </div>
            <div className='input-wrapper'>
            <label>Expiry Date</label>          
            <input type="text" placeholder='MM/YY' required></input>
            </div>
            <div className='input-wrapper'>
            <label>CVV</label>
            <input type="password" placeholder='CVV' required></input>  
            </div>
        </form>
        </div>
        <div className='checkout-summary'>
            <h3>Order Summary</h3>
            <br/>
            <div className='summary-list'>
            {cartproducts.map((prod)=>(
                <div className='order-item'>
                    <i>{prod.name} x <b style={{color: "brown"}}>{prod.count}</b></i>
                    <p style={{color: "blue"}}>${prod.price*prod.count}</p>
                </div>
            ))}
            </div>
            <div className='billrow'><p>SubTotal</p><p>${cartproducts.reduce((acc, item) => acc + item.price * item.count, 0)}</p></div><hr/>
            <div className='billrow'><p>Shipping Fee</p><p >$5</p></div><hr/>    
            <b className='billrow' style={{color: "red"}}><p>Total</p>${cartproducts.reduce((acc, item) => acc + item.price * item.count, 0)+5}</b>
            <button className='place-order'>Place Order</button>
        </div>

      </div>
    </div>
  )
}


export default Checkout
