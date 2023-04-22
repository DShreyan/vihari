const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    tname: {
        type: String,
        required: true
      },
    tprice: {
        type: Number,
        required: true
      },
    DispImageurl:{
        type:String,
        required:true
    },
    places:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Place"
    }]
  },
  {timestamps:true}
  );

  const Tour=mongoose.model('Tour',tourSchema);

  module.exports=Tour;
