/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');

var user = require('./routes/user');
//var cat = require('./routes/cat');
//var product = require('./routes/product');
var auction = require('./routes/auction');
//var selling = require('./routes/selling');
//var review = require('./routes/review');

var con = require('./conn');
var passportlocal = require('passport-local');
var bodyParser= require('body-parser');
var cookieParser =require('cookie-parser');
var expressSession = require('express-session');
var app = express();
app.set('view engine','ejs');
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

app.get('/login', user.login);

app.get('/loginfail', user.loginfail);

app.post('/login',passport.authenticate('local', {failureRedirect: '/loginfail'}), user.loginPost);

app.get('/logout', user.logout);

app.get('/signup', user.signup);

app.get('/signupfail', user.signupfail);

app.post('/signup', user.signupPost);


app.get('/profile', user.profile);

app.get('/seller', user.getAllSeller);

app.get('/customer', user.getAllCustomer);


app.get('/cat/', cat.getAllCat);

app.get('/cat/:catname', cat.getCat);

app.post('/cat', cat.createCat);

app.post('/deletecats', cat.deleteCat);

app.get('/product', product.getAllProduct);

app.get('/product/:productname', product.getProduct);

app.post('/product', product.createProduct);

app.post('/deleteproduct', product.deleteProduct);

app.post('/buyproduct', product.buyProduct);


app.get('/auction', auction.getAllAction);

app.post('/bidproduct', auction.bidProduct);


app.get('/createreview/:productid', review.getReviewPage);

app.post('/createreview', review.createReview);

app.get('/review', review.getReview);


app.get('');

 
var port= process.env.PORT||3000;
app.listen(port,function(){
	console.log('http://127.0.0.1:'+port+'/');
  
  });