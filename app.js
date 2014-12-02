/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var user = require('./routes/user');
var cat = require('./routes/cat');
var product = require('./routes/product');
var auction = require('./routes/auction');
var selling = require('./routes/selling');
var review = require('./routes/review');
var search = require('./routes/search');
var con = require('./conn');
var passportlocal = require('passport-local');
var bodyParser= require('body-parser');
var cookieParser =require('cookie-parser');
var expressSession = require('express-session');
var app = express();
var path = require('path');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'/public/images')}));

	});

app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET||'secret',
    resave: false,
    saveUninitialized : false

}));

app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new passportlocal.Strategy(user.passportAauth));

passport.serializeUser(user.serializeUser);

passport.deserializeUser(user.deserializeUser);


app.get('/', user.root);

	
	
	
//get login page
app.get('/login', user.login);

//get login fail page
app.get('/loginfail', user.loginfail);

app.post('/login',passport.authenticate('local', {failureRedirect: '/loginfail'}), user.loginPost);

app.get('/logout', user.logout);

//get sign in page
app.get('/signup', user.signup);

//get sign up fail page
app.get('/signupfail', user.signupfail);

app.post('/signup', user.signupPost);


//get profile page
app.get('/profile', user.profile);

app.get('/purhis', user.purHis);
	


//get all sellers, in json format TBD
app.get('/seller', user.getAllSeller);

//get all customers, in json format TBD
app.get('/customer', user.getAllCustomer);


//get a page contains all cats and some hot sellings and auctions, can be presented as home page TBD
app.get('/cat/', cat.getAllCat);

//get a page contains all products under this cat
app.get('/cat/:catname', cat.getCat);

app.post('/cat', cat.createCat);

app.post('/deletecats', cat.deleteCat);


//get all products, in json format TBD
app.get('/product', product.getAllProduct);

app.get('/product/:productid', product.getProduct);

app.post('/product', product.createProduct);

app.post('/deleteproduct', product.deleteProduct);


app.post('/buyproduct', selling.buyProduct);

//get selling detail page
app.get('/selling/:sellingid', selling.getSelling);

//get all sellings, in json format TBD
app.get('/selling', selling.getAllSelling);

//get selling creation page
app.get('/cselling', selling.createSellingPage);

app.post('/selling', selling.createSelling);

app.post('/deleteselling', selling.deleteSelling);


//get all auctions, in json format TBD
app.get('/auction', auction.getAllAuction);

//get auction detail page
app.get('/auction/:auctionid', auction.getAuction);

//get auction creation page
app.get('/cauction', auction.createAuctionPage);

app.post('/auction', auction.createAuction);

app.get('/bidauction/:auctionid', auction.bidAuction);

//get all bids under one auction
app.get('/bid/:auctionid', auction.getBid);

app.post('/deleteAuction', auction.deleteAuction);


//get a page for wiriting a review TBD
app.get('/createreview/:sellingid', review.getReviewPage);

app.post('/createreview', review.createReview);

//get all reviews in Json format TBD
app.get('/review/:userid', review.getReview);

app.post('/deletereview', review.deleteReview);

app.get('/search/:keyword', search.search);


app.get('');

 
var port= process.env.PORT||3000;
app.listen(port,function(){
	console.log('http://127.0.0.1:'+port+'/');
  
  });