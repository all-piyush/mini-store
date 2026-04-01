const express=require("express");
const cors=require("cors");
const cookieparser=require('cookie-parser');
const app=express();

require("dotenv").config();
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`app started at port ${PORT} ` );
})
app.use(express.json());

app.use(cors({
  origin:['http://localhost:5173',
    'https://mini-store-c7rx.onrender.com'], 
  credentials: true,          
}));
app.use(cookieparser());
const authroute=require('./routes/Routes');
app.use('/api/v1',authroute);
app.get('/',(req,res)=>{
    res.send("hello jee");
})
const dbconnect=require('./config/database');
dbconnect();
