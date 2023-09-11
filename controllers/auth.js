const User = require("../models/user");
const crypto =require("crypto");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const nodemailer = require("nodemailer");
const { log } = require("console");

var mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'vihari.t05@gmail.com',
      pass: 'gyeeyglwekzwuwzy'
  }
});
exports.verifyEmail =async(req,res)=>{
  const mailOptions = {
    from: 'vihari.t05@gmail.com',
    to:  req.body.email,
    subject: 'Verify your Email',
    text: `your one time password for email verification :${req.body.otp}`
};
  const info = await mailTransporter.sendMail(mailOptions)
  .then((info) => {
    console.log(`Email sent to: ${req.body.email}`);
})
.catch((error) => {
    console.log(`Error occurred while sending email: ${error}`);
    res.render('signup');
});
}

exports.getsignup=(req,res)=>{
  let message=req.flash('error');
  if(message.length > 0){
    message = message[0];
  }
  else{
    message = null;
  }
    res.render('signup',{
      errorMsg: message
    });
    
}
exports.getLogin=(req,res,next)=>{
  let message=req.flash('error');
  if(message.length > 0){
    message = message[0];
  }
  else{
    message = null;
  }
  res.render('login',{
    errorMsg: message
  });
};
exports.postsignup=async(req,res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const psd=req.body.psd;
  
    const user=new User();
    
    User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash('error','E-mail exists please pick a different email address');
        res.redirect("/signup");
      }
      return bcrypt
        .hash(psd, 12)
        .then((hashedPwd) => {
          user.email = email;
          user.password = hashedPwd;
          user.firstName=fname;
          user.lastName=lname;
          return user.save();
        })
        .then((result) => {
          console.log(result);
          return res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.postLogin=(req,res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const psd=req.body.psd;
    if(email=="admin@gmail.com"){
      Admin.findOne({ email: email }).then((admin) => {
       
            if (psd=='admin@123') {
              req.session.isLoggedIn = true;
              req.session.user = admin;
              res.redirect("/admindb");
            } else {
              req.flash("error", "Password not matching");
              res.redirect("/login");
            }
          
      });
    }else{
      User.findOne({email:email}).then((user)=>{
        if(!user){
            req.flash('error','Invalid email or password');
            return res.redirect('/login');
        }
        bcrypt
          .compare(psd, user.password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
             
              return req.session.save((err) => {
                if (err) {
                  console.log(err);
                }
                res.redirect("/userhome");
              });
            }
            res.redirect("/login");
          })
          .catch((err) => {
            console.log(err);
            res.redirect("/login");
          });
      });
    }
  
}



exports.Logout=(req,res)=>{
  req.session.destroy((err)=>{
    res.redirect('/');
  })
}

exports.getReset = (req, res,next)=>{
  let message=req.flash('error');
  if(message.length > 0){
    message = message[0];
  }
  else{
    message = null;
  }
  res.render('reset',{
    errorMsg: message
  
  });
};

exports.postReset = (req,res,next)=> {
  crypto.randomBytes(32,(err,buffer) => {
    if(err){
      console.log(err);
      return res.redirect('/reset');
    }
   const token = buffer.toString('hex');
   User.findOne({email:req.body.email})
   .then(user=>{
    if(!user){
      req.flash('error','No account with that email found.');
      return res.redirect('/reset');
    }
    user.resetToken = token;
    user.resetTokenExpiration=Date.now()+3600000;
  })
  .then(result=>{
    res.redirect('/');
    mailTransporter.sendMail({
      from: 'vihari.t05@gmail.com',
      to:  req.body.email,
      subject: 'Password reset',
      html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="http://localhost:5000/reset/${token}">link</a>  to set a new password</p>
      `
  });
})
  .catch(err=>{
    console.log(err);
   });
  });
  };

  exports.getNewPassword = (req, res,next) => {
    const token = req.params.token;
    User.findOne({
      resetToken:token,resetTokenExpiration: {$gt: Date.now()}} 
      )
      .then(user => {
        let message=req.flash('error');
        if(message.length > 0){
          message = message[0];
        }
        else{
          message = null;
        }
        
          res.render('newPassword', {
            errorMsg: message,
            userId: String(User._id),
            passwordToken: token,
          });
      
        
      })
      .catch(err=>{
        console.log(err);
      });
   
  };

  exports.postNewPassword = (req, res) => {
   const newPassword = req.body.psd;
   const userId = req.body.userId;
   const passwordToken = req.body.passwordToken;
   let resetUser;

   User.findOne({resetToken:passwordToken,resetTokenExpiration:{$gt:Date.now()} ,
  _id: userId
   }).then(user => {
    return bcrypt.hash(newPassword,12);
   })
   .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken =null;
      resetUser.resetTokenExpiration =undefined;
      return resetUser.save();
   })
   .then(result =>{
     res.redirect('/login');
   })
   .catch(err=>{
    console.log(err);
   });
  
  
  };