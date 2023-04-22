const express = require("express");
const app = express();
const ejs = require("ejs");
const port = 5000;
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User=require('./models/user');
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const store = new MongoDbStore({
  uri: 'mongodb+srv://Srikar:Sailu3002@cluster0.ch9hacp.mongodb.net/Vihari',
  collection: "sessions",
});
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images',express.static(__dirname+"/images"));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views')
app.set('view engine', 'ejs')

const adminroutes = require("./routes/admin");
const authRoutes=require('./routes/auth');
const tourRoutes=require('./routes/tour');
const userRoutes=require('./routes/user');



app.use(adminroutes);
app.use(authRoutes);
app.use(tourRoutes);
app.use(userRoutes);


app.get("/", function (req, res) {
    res.render('index');
});

app.get("/new", function (req, res) {
    res.render('new');
});

app.get("/tours", function (req, res) {
    res.render('tours');
});

app.get("/contact",function(req,res){
    res.render('contact');
});


app.get("/reviews",function(req,res){
    res.render('reviews')
});

app.get("/about",function(req,res){
    res.render('about')
});

app.get("/final",function(req,res){
    res.render('final')
});

app.get("/payment",function(req,res){
    res.render('payment')
});

app.get("/searchbuses",(req,res)=>{
    res.render("searchbuses");
});

app.get("/prevbookings",(req,res)=>{
  res.render("prevbookings");
});
app.get("/cancelticket",(req,res)=>{
  res.render("cancelticket");
});
app.get("/adminlogin",(req,res)=>{
  res.render("adminlogin");
});
  app.post('/payment',(req,res)=>{
    res.render("payment");
  });

app.get("/adminprofile",(req,res)=>{
  res.render('adminprofile',{title:'Admin Profile'})
});

app.get("/layout",(req,res)=>{
  res.render('layout');
});
app.post("/layout",(req,res)=>{
  res.redirect("/payment");
});
mongoose
  .connect(
    "mongodb+srv://Srikar:Sailu3002@cluster0.ch9hacp.mongodb.net/Vihari"
  )
  .then((result) => {
    app.listen(5000, () => {
      console.log("listening to port 5000");
    });
    console.log("Mongodb connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));


