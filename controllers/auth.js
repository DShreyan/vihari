const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
        res.redirect("/");
      });
  });

  

}

exports.Logout=(req,res)=>{
  req.session.destroy((err)=>{
    res.redirect('/');
  })
}