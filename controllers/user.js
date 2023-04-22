exports.getHomepage=(req,res)=>{
    res.render('userhome',{user:req.session.user});
}