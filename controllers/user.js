const Bus=require('../models/buses');
const Tour=require('../models/tour');
const Ticket=require('../models/ticket');
const User = require('../models/user');
exports.getHomepage=(req,res)=>{
    Tour.find({})
    .then((tours)=>{
        res.render('user/userhome',{user:req.session.user,tours:tours});
    })    
}


exports.postBookTicket=(req,res)=>{
    const seats=req.body.seat;
    const names=req.body.name;
    const age=req.body.age;
    const bus=req.body.BusId;
    
    const userId=req.session.user._id;

    User.findOne({_id: userId})
        .then((user) => {
            if (user) {
                // User already exists, add ticket to existing user object
                const ticket = new Ticket();
                ticket.user = userId;
                ticket.bus=bus;
                const details = seats.map((seat, i) => ({
                    name: names[i],
                    age: age[i],
                    seatNo: seat
                }));
                ticket.tickets = details;
                user.tickets.push(ticket._id);
                return Promise.all([ticket.save(), user.save()]);
            } else {
                // User does not exist, create new user object with ticket details
                const ticket = new Ticket();
                ticket.user = userId;
                ticket.bus=bus;
                const details = seats.map((seat, i) => ({
                    name: names[i],
                    age: age[i],
                    seatNo: seat
                }));
                ticket.tickets = details;
                const newUser = new User({_id: userId, tickets: [ticket._id]});
                return Promise.all([ticket.save(), newUser.save()]);
            }
        })
        .then(() => {
            res.redirect('/payment');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}

exports.getPreviousBookings=(req,res)=>{
    User.findById(req.session.user._id)
    .populate({
     path:'tickets',
     populate:{
         path:'bus',
         model:'Bus'
     },
    })
    .then((user)=>{
  
     res.render('user/prevbookings',{tickets:user.tickets});
    })
 }

 exports.cancelTicket=(req,res)=>{
    const id=req.params.id;
    Ticket.findByIdAndDelete(id)
    .then(()=>{
        console.log('Bus Ticket deleted');
        res.redirect('/prevbookings');
    })
}

exports.viewTicket=(req,res)=>{
    const id=req.params.id;
    Ticket.findById(id)
    .then((ticket)=>{
        res.render('new',{ticket:ticket});
    })
}

exports.getAllPlaces=(req,res)=>{
    const id=req.params.tourid;
    Tour.findById(id)
    .populate('places')
    .then((data)=>{
        res.render('user/tourplaces',{data:data,places:data.places});
    })

}
exports.getTours=(req,res)=>{
    Tour.find({})
    .then((tours)=>{

        res.render('user/tours',{user:req.session.user,tours:tours});
    })
}
exports.getAbout=(req,res)=>{
    res.render('user/about',{user:req.session.user});
}
exports.getContact=(req,res)=>{
    res.render('user/contact',{user:req.session.user});
}
exports.getPrevBooking=(req,res)=>{
    res.render('user/prevbookings',{user:req.session.user});
}
exports.getCancelTicket=(req,res)=>{
    res.render('user/cancelticket',{user:req.session.user});
}
exports.getLayout=(req,res)=>{
    res.render('user/layout');
}
exports.getAllIndexPlaces=(req,res)=>{
    const id=req.params.tourid;
    Tour.findById(id)
    .populate('places')
    .then((data)=>{
        res.render('tourplaces',{data:data,places:data.places});
    })
}