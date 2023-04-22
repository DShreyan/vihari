const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const isAuth = require("../middleware/isAuth");

router.get('/userhome',isAuth,userController.getHomepage);



module.exports=router;