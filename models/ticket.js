const mongoose = require('mongoose');

const ticketSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    bus:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bus'
    },
    tickets:[{
        name:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
       seatNo:{
            type:String,
            required:true
        }
    }]
});

const Ticket=mongoose.model('Ticket',ticketSchema);
module.exports=Ticket;