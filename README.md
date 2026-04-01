# E-Commerce MERN App
A full-stack eCommerce web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse products, manage cart, and place orders.

## Features
- Browse products
- Filter by category & type
- View product details
- Add / remove items from cart
- Update item quantity
- Checkout flow (basic)
- User authentication (JWT-based)

## Tech Stack
### Frontend
- React
### Backend
- Node.js
- Express.js
- MongoDB

## Project Structure
root  
|  
| --- ecommerce-front  (frontend)  
| --- ecommerce-back   (backend)

## Setup
 ### Clone the repository
 
 - https://github.com/all-piyush/mini-store.git
 ## Setup Backend
cd ecommerce-back  
npm install    
Create .env file:  
- PORT=5000
- MONGO_URI=your_mongodb_connection
- JWT_SECRET=your_secret

## Setup Frontend
  cd ecommerce-front  
  npm install  

  Create .env file:
  - VITE_APP_API_KEY=http://localhost:5000
