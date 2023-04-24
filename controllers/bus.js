const Bus = require('../models/buses');

exports.searchBuses = function(req, res) {
  const { srcname, destname, date } = req.body;
  const searchDate = new Date(date);
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  Bus.find({
    srcname: { $regex: new RegExp(srcname, "i") },
    destname: { $regex: new RegExp(destname, "i") }
  })
  .then((Buses)=>{
    console.log(Buses);
    res.render('searchbuses',{Buses:Buses,date:searchDate});
  })
}

exports.layout = function(req,res){
    const id=req.params.id;
    Bus.findById(id)
    .then((bus)=>{
        res.render('layout',{bus:bus});
    })
    .catch((err)=>{
        console.log(err);
    })
}