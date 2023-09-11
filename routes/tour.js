const express=require('express');
const router=express.Router();
const isAuth = require('../middleware/isAuth');
const tourController=require('../controllers/Tour');

router.get('/tours',tourController.getAllTours);


module.exports=router;