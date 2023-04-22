const Tour=require('../models/tour');
exports.getAllTours=(req,res)=>{
    Tour.find({})
    .then((tours)=>{
        res.render('tours',{tours:tours});
    })
    .catch((err)=>{
        console.log(err);
    })

};

