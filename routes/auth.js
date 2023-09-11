const express=require('express');
const router=express.Router();



const authController=require('../controllers/auth');
router.get('/login',authController.getLogin);
router.get('/signup',authController.getsignup);
router.post('/signup',authController.postsignup);
router.post('/login',authController.postLogin);
router.get('/logout',authController.Logout);
router.post('/otp',authController.verifyEmail);
router.get('/reset',authController.getReset);
router.post('/reset',authController.postReset);
router.get('/reset/:token',authController.getNewPassword);
router.post('/newPassword',authController.postNewPassword);
module.exports=router;