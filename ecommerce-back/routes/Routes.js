const express=require('express');
const router=express.Router();
const {login,signup}=require('../Controllers/userlogin');
const {addproduct,deleteproduct,getcart}=require('../Controllers/Cart');
const{logout}=require('../Controllers/logout');
const {auth,checkauth}=require('../Controllers/auth');
const{getproducts}=require('../Controllers/Product');

router.post('/login',login);
router.post('/signup',signup);
router.get('/logout',auth,logout);
router.put('/addproduct',auth,addproduct);
router.put('/deleteproduct',auth,deleteproduct);
router.get('/getcart',auth,getcart);
router.get('/getproducts',getproducts);
router.get('/check-auth',auth,checkauth);
module.exports=router;