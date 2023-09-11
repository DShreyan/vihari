const Tour=require('../models/tour');

exports.getAllTours=async (req,res)=>{
    var search=req.body.tname;
    // console.log(search)
    if(!search)
    search=''
     regex = new RegExp(search, "i");

    // const filteredtours=await tours.find({ tname: { $regex: regex } });
    // console.log(filteredtours)
    // res.render('tours',{tours:filteredtours});
    Tour.find({tname:{$regex:regex}})
    .then((tours)=>{
        // console.log(tours)
        res.render('tours',{tours:tours});
    })
    .catch((err)=>{
        console.log(err);
    })

};

exports.getMoreTours=(req,res)=>{
    const {offset} = req.query;
    Tour.find({}).skip(offset).limit(3)
    .then((tours)=>{
        res.json(tours);
    })
    .catch((err)=>{
        console.log(err);
        res.status(401)
    })

};