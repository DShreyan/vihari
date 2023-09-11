const express=require('express');
const router=express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');
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
router.get('/admindb',isAuth,adminController.getAllBuses);
router.get('/admindb/allusers',isAuth,adminController.getAllUsers);
router.get('/adduser',isAuth,adminController.AddUser);
router.post('/adduser',isAuth,adminController.postadminadduser);
router.get('/admindb/alltours',isAuth,adminController.getAllTours);
router.get('/addtour',isAuth,adminController.AddTour);
router.get('/admindb/allbuses',isAuth,adminController.getAllBuses);
router.get('/addbus',isAuth,adminController.AddBus);
router.post('/addbus',isAuth,image.single('bimage'),adminController.postAddBus);
router.get('/admindb/opentour/:id',isAuth,adminController.getSingletour);
router.get('/admindb/addplaces/:id',isAuth,adminController.getAddPlace);
router.post('/admindb/addplaces/:id',isAuth,image.single('pimage'),adminController.postAddPlace);
router.post('/addtour',isAuth,image.single('timage'),adminController.postAddTour);
router.get('/admindb/editbus/:id',isAuth,adminController.EditBusDetails);
router.post('/admindb/editbus/:id',isAuth,image.single('uimage'),adminController.postEditBus);
router.post('/place/edit',isAuth,image.single('upimage'),adminController.postEditPlace);
router.post('/admindb/deletebus/:id',isAuth,adminController.RemoveBus);
router.post('/admindb/deleteplace/:id',isAuth,adminController.Removeplace);
router.get('/admindb/deletetour/:tourid',isAuth,adminController.Removetour);

router.post('/admindb/deleteuser/:id',isAuth,adminController.Removeuser);

router.post('/admindb/edit/:tourid',isAuth,adminController.postEditTour);
// router.post('/admindb/edit/:tourid',image.single('tourimage'),adminController.postEditTour);
router.get('/admindb/announcements',isAuth,adminController.getannouncements);
router.post('/admindb/announcements',isAuth,adminController.sendannouncements);
router.get('/admin/adminprofile',isAuth,adminController.getAdminProfile);
module.exports = router;
