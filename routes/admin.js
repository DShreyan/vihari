const express=require('express');
const router=express.Router();

const adminController = require('../controllers/admin');

const multer=require('multer');
const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,file.filename+"-"+file.originalname);
    },
});

const image=multer({dest:'Images'});
router.get('/admindb',adminController.getAllBuses);
router.get('/admindb/allusers',adminController.getAllUsers);
router.get('/adduser',adminController.AddUser);
router.post('/adduser',adminController.postadminadduser);
router.get('/admindb/alltours',adminController.getAllTours);
router.get('/addtour',adminController.AddTour);
router.get('/admindb/allbuses',adminController.getAllBuses);
router.get('/addbus',adminController.AddBus);
router.post('/addbus',image.single('bimage'),adminController.postAddBus);
router.get('/admindb/opentour/:id',adminController.getSingletour);
router.get('/admindb/addplaces/:id',adminController.getAddPlace);
router.post('/admindb/addplaces/:id',image.single('pimage'),adminController.postAddPlace);
router.post('/addtour',image.single('timage'),adminController.postAddTour);
router.get('/admindb/editbus/:id',adminController.EditBusDetails);
router.post('/admindb/editbus/:id',image.single('uimage'),adminController.postEditBus);
router.post('/place/edit',image.single('upimage'),adminController.postEditPlace);
router.post('/admindb/deletebus/:id',adminController.RemoveBus);
router.get('/admindb/deleteplace/:id',adminController.Removeplace);
router.get('/admindb/deletetour/:tourid',adminController.Removetour);
router.get('/admindb/deleteuser/:id',adminController.Removeuser);
router.post('/admindb/edit/:tourid',adminController.postEditTour);
// router.post('/admindb/edit/:tourid',image.single('tourimage'),adminController.postEditTour);
router.get('/admindb/announcements',adminController.getannouncements);
router.post('/admindb/announcements',adminController.sendannouncements);
router.get('/admin/adminprofile',adminController.getAdminProfile);
module.exports = router;
