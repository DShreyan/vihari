const usermodel = require('../models/user');
const Tour=require('../models/tour');
const Bus=require('../models/buses');
const Place=require('../models/place');
const admin=require('../models/admin');
const bcrypt=require('bcryptjs');
const path=require('path');
const { BUSY } = require('sqlite3');
const { log } = require('console');
var nodemailer = require('nodemailer');
const { title } = require('process');

var mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vihari.t05@gmail.com',
        pass: 'gyeeyglwekzwuwzy'
    }
});
exports.getAllUsers=(req,res)=>{
    usermodel.find({})
    .then((result)=>{
    res.render('admin/allusers',{title:'User Details',users:result});
})
.catch((err)=>{
    console.log(err);
})
};
exports.AddUser=(req,res)=>{
        res.render('admin/addusers',{title:'Add User'});
};
exports.getAllTours=(req,res)=>{
    Tour.find({})
    .then((tours)=>{
        res.render('admin/alltours',{title:'Tour Details',tours:tours});
    })
    .catch((err)=>{
        console.log(err);
    })
   
};
exports.AddTour=(req,res)=>{
    res.render('admin/addtour',{title:'Add Tour'});
};
exports.getAllBuses=(req,res)=>{
    Bus.find({})
    .then((buses)=>{
    res.render('admin/allbuses',{title:'Bus Details',buses:buses});
})
.catch((err)=>{
    console.log(err);
})
};
exports.AddBus=(req,res)=>{
    res.render('admin/addbus',{title:'Add Bus'});
};
exports.getSingletour=(req,res,next)=>{
    const id=req.params.id;
    Tour.findById(id)
    .populate('places')
    .then(tour=>{
        res.render('admin/tourdetails',{data:tour,places:tour.places});
    })
    .catch(err => console.log(err));
};

exports.getAddPlace=(req,res)=>{
    const id=req.params.id;
    res.render('admin/addplaces',{title:'Add Place',id:id});
};

exports.postAddPlace=(req,res)=>{
    const id=req.params.id;
    const name=req.body.pname;
    const desc=req.body.pdesc;
    const image=req.file;
    const imageurl=image.path;

    const place=new Place({
        name:name,
        Imageurl:imageurl,
        description:desc,
        tour:id,
    });

    place.save()
    .then(()=>{
        console.log('Tour place Entered');
        return Tour.findById(id).exec();
    })
    .then((tour)=>{
        tour.places.push(place._id);
        return tour.save();
    })
    .then(()=>{
        return res.redirect(`/admindb/opentour/${id}`);
    })
    .catch((err)=>{
        console.log(err);
    })
    
}




exports.postAddTour=(req,res)=>{
    const tname=req.body.tname;
    const price=req.body.tprice;
    const image=req.file;
    const imageurl = image.path;

    const tour=new Tour({
        tname:tname,
        tprice:price,
        DispImageurl:imageurl,
    });

    tour.save()
    .then((result)=>{
        console.log('Tour Created');

    })
    .then(()=>{
        res.redirect('/admindb/alltours');
    })
    .catch((err)=>{
        console.log(err);
    })

}
exports.postadminadduser=(req,res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const psd=req.body.psd;
    
    const user=new usermodel();
    
    usermodel.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.redirect("/admindb/allusers");
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
          return res.redirect("/admindb/allusers");
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.postAddBus=(req,res)=>{
    const srcname=req.body.srcname;
    const destname=req.body.destname;
    const trname=req.body.trname;
    const deptime=req.body.deptime;
    const arrtime=req.body.arrtime;
    const durtime=req.body.durtime;
    const tktprice=req.body.tktprice;
    const btype=req.body.btype;
    const image=req.file;
    const imageurl = image.path;

    const bus=new Bus({
        srcname:srcname,
        destname:destname,
        trname:trname,
        deptime:deptime,
        arrtime:arrtime,
        durtime:durtime,
        tktprice:tktprice,
        btype:btype,
        Imageurl:imageurl,
    });

    bus.save()
    .then((result)=>{
        console.log('Bus Created');

    })
    .then(()=>{
        res.redirect('/admindb/allbuses');
    })
    .catch((err)=>{
        console.log(err);
    })
};

exports.EditBusDetails=(req,res)=>{
    var id=req.params.id;
    Bus.findById(id)
    .then((bus)=>{
        res.render('admin/editbus',{title:'Edit Bus',bus:bus});
    })
    
}

exports.getannouncements=(req,res)=>{
   
    res.render('announcements',{title:'Announcements'});
};
    exports.sendannouncements = (req, res, next) => {
        const { subject, message } = req.body;
        usermodel.find()
            .then((users) => {
                const emailList = users.map(user => user.email);
                const mailOptions = {
                    from: 'srikar.a21@iiits.in',
                    to: emailList.join(','),
                    subject: subject,
                    text: message
                };
                mailTransporter.sendMail(mailOptions)
                    .then((info) => {
                        console.log(`Email sent: ${info.response}`);
                        res.redirect('/admindb/allusers');
                    })
                    .catch((error) => {
                        console.log(`Error occurred while sending email: ${error}`);
                        res.redirect('/admindb/announcements');
                    });
            })
            .catch((error) => {
                console.log(`Error occurred while finding users: ${error}`);
                res.redirect('/admindb/announcements');
            });
      };

exports.postEditBus=(req,res)=>{
    const id=req.params.id;
    const srcname=req.body.srcname;
    const destname=req.body.destname;
    const trname=req.body.trname;
    const deptime=req.body.deptime;
    const arrtime=req.body.arrtime;
    const durtime=req.body.durtime;
    const tktprice=req.body.tktprice;
    const btype=req.body.btype;
    const image=req.file;
    const imageurl=image.path;

    Bus.findById(id)
    .then((Bus)=>{
        Bus.srcname=srcname;
        Bus.destname=destname;
        Bus.trname=trname;
        Bus.deptime=deptime;
        Bus.arrtime=arrtime;
        Bus.durtime=durtime;
        Bus.tktprice=tktprice;
        Bus.btype=btype;
        Bus.Imageurl=imageurl;
        return Bus.save();
    })
    .then((Bus)=>{
        console.log("Bus Details Updated");
        res.redirect('/admindb/allbuses');
    })
    .catch((err)=>{
        console.log(err);
    })

};

exports.postEditTour=(req,res)=>{
    const tid=req.params.tourid;
    const tname=req.body.tname;
    const tprice=req.body.tprice;
    // const image=req.file;
    // const DispImageurl=image.path;
    Tour.findById(tid)
    .then((tour)=>{
        // tour.DispImageurl=DispImageurl;
        tour.tname=tname;
        tour.tprice=tprice; 
        return tour.save();
    })
    .then((tour)=>{
        console.log("Tour Details Updated");
        res.redirect('/admindb/alltours');
    })
    .catch((err)=>{
        console.log(err);
    })
};


exports.RemoveBus=(req,res)=>{
   
    const id=req.params.id;
    Bus.findByIdAndDelete(id)
    .then((bus)=>{
        if(!bus){
            console.log('Bus Not found');
        }
        console.log('Bus Removed ');
        res.redirect(`/admindb/allbuses`);

    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.Removeplace=(req,res)=>{
    const id=req.params.id;
    Place.findByIdAndDelete(id)
    .then((place)=>{
        if(!place){
            console.log('Place Not found');
        }
        console.log('Place Removed ');
        res.redirect(`/admindb/alltours`);

    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.Removetour=(req,res)=>{
    const tid=req.params.tourid;
    Tour.findByIdAndDelete(tid)
    .then((tour)=>{
        if(!tour){
            console.log('Tour Not found');
        }
        console.log('Tour Removed ');
        res.redirect(`/admindb/alltours`);
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.Removeuser=(req,res)=>{
    const id=req.params.id;
    usermodel.findByIdAndDelete(id)
    .then((user)=>{
        if(!user){
            console.log('User Not found');
        }
        console.log('User Removed ');
        res.redirect(`/admindb/allusers`);
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.postEditPlace=(req,res)=>{
    const id=req.body.placeId;
    const name=req.body.name;
    const description=req.body.description;
    const image=req.file;
    const Imageurl=image.path;
    const tid=req.body.tid;
    Place.findById(id)
    .then((place)=>{
        place.name=name;
        place.description=description;
        place.Imageurl=Imageurl;
        return place.save();
    })
    .then(()=>{
        res.redirect(`/admindb/opentour/${tid}`);
    })

}

exports.getAdminProfile=(req,res)=>{
    admin.find({email:'admin@gmail.com'})
    .then((admin)=>{
        console.log(admin);
        res.render('admin/adminprofile',{title:'Admin Profile',admin : admin});
    })
    
}