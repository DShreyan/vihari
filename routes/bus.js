const express=require('express');
const router=express.Router();

const busController=require('../controllers/bus');

router.post('/searchbuses',busController.searchBuses);
router.get('/layout/:id',busController.layout);


module.exports=router;