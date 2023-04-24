const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const isAuth = require("../middleware/isAuth");
const busController = require("../controllers/bus");

router.get('/userhome',isAuth,userController.getHomepage);
// router.get('/searchbuses',userController.getAllBuses);
router.get('/user/searchbuses',busController.searchBuses);
router.get('/user/tourplaces/:tourid',userController.getAllPlaces);
router.get('/user/tours',isAuth,userController.getTours);
router.get('/user/about',isAuth,userController.getAbout);
router.get('/user/contact',isAuth,userController.getContact);
// router.get('/user/prevbookings',isAuth,userController.getPrevBooking);
router.get('/user/cancelticket',isAuth,userController.getCancelTicket);
router.get('/tourplaces/:tourid',userController.getAllIndexPlaces);
 router.post('/user/searchbuses',isAuth,busController.searchBuses);
router.post('/searchbuses',busController.searchBuses);
router.post('/passengerDetails',userController.postBookTicket);
router.get('/user/prevbookings',userController.getPreviousBookings);
router.get('/user/cancel/tickets/:id',userController.cancelTicket);
router.get('/user/viewticket/:id',userController.viewTicket);

module.exports=router;