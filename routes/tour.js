const express=require('express');
const router=express.Router();

const tourController=require('../controllers/Tour');

router.get('/tours',tourController.getAllTours);


module.exports=router;