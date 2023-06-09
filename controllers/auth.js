const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
exports.getsignup=(req,res)=>{
    res.render('signup');
}
exports.getLogin=(req,res)=>{
  res.render('login');
}
exports.postsignup=(req,res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const psd=req.body.psd;

    const user=new User();
    
    User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.redirect("/login");
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
              // req.flash("error", "Password not matching");
              res.redirect("/login");
            }
          
      });
    }else{
      User.findOne({email:email}).then((user)=>{
        if(!user){
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
            res.redirect("/");
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