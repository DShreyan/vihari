const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const nodemailer = require("nodemailer");

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