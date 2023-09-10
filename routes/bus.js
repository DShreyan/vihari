const express=require('express');
const router=express.Router();
const isAuth = require('../middleware/isAuth');
const busController=require('../controllers/bus');

router.post('/searchbuses',isAuth,busController.searchBuses);
router.get('/layout/:id',isAuth,busController.layout);


module.exports=router;