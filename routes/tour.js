const express=require('express');
const router=express.Router();
const isAuth = require('../middleware/isAuth');
const tourController=require('../controllers/Tour');
const tours=require('../models/tour');
router.get('/tours',tourController.getAllTours);
router.get('/loadmoretours', tourController.getMoreTours);
router.post("/tours/search",async (req,res)=>{
    
    const search=req.body.tname;
    var regex = new RegExp(search, "i");
    const filteredtours=await tours.find({ tname: { $regex: regex } });
    // console.log(filteredtours)
    res.render('tours',{tours:filteredtours});
    
  })
module.exports=router;