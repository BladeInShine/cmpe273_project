var ejs = require('ejs');
var sql = require('../conn');
var connection= require('../conn');
var passpport=require('passport');
 
function root(req,res){
	
	res.render('index',{
		isAuthenticate:req.isAuthenticated()	,
		user:req.user
	});
	
}

function login (req,res) {
res.render('login',{
	isAuthenticate: req.isAuthenticated(),
	user:req.user,
})}
function loginfail(req,res){
	
	
	
	
	
} 
function signupfail(req,res){
	
	
	
	
}

function loginPost(req,res){
	//passport.authenticate('local');
	if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}	
    console.log("/ligin POST is requested.");
    console.log(req.user);
    res.render('index',{
    	user: req.user,
		isAuthenticate: req.isAuthenticated(),
	});	
		
  
}

function logout(req,res){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}	
	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	var Logsql = "update user set lastlogintime = '"+today+"' where email ='"+req.user.email+"';";
	console.log(Logsql);
	sql.fetchData(Logsql,function(error,callback){
		console.log(Logsql);
		console.log(today);
    	
	});
	isAuthenticate: req.isAuthenticated(),
    req.logout();
	res.redirect('/');
}

 function passportAauth(username, password, done){
	
	var qS = "SELECT * FROM user where email=" + "'"+username + "';";
    
	sql.fetchData(qS, function(error, rows){
		
		
		if(rows[0].password == password)
		{
			done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname});
		}
		else
		{
			done(null,null);
		}
	});
}
  
function signup(req,res){

	res.render('signup',{
		isAuthenticate: req.isAuthenticated(),
	});	
                             
}



function signupPost(req,res)
{
var email = req.body.email;  
var pwd = req.body.password;  
var first = req.body.firstname;
var last = req.body.lastname;


var userSQL = "INSERT INTO user (`email`, `password`, `firstName`, `lastName` ) VALUES ('" + email + "', '" + pwd + "', '" + first + "', '" + last +  "');";
sql.fetchData(userSQL,function(error,callback){
console.log(userSQL);
})
//sql.fetchData(userSQL,function(error,callback){
//
//})
res.render('login');
}

function profile(req,res){
if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}

var rewSQL = "select * from review where user='"+req.user.email+"';";
console.log("req.user"+req.user.lastname);
connection.fetchData(rewSQL,function(error, rewData){
	res.render('myebay',{
	user:req.user,
	isAuthenticate: req.isAuthenticated(),
	
   rewData:rewData
 })
	
	


})


}


function getAllSeller(){
	
	
}
function getAllCustomer(){
	
	
	
}


function serializeUser(user,done){
	done(null,user.email);
	
}
 
function deserializeUser(email,done){
  var qS = "SELECT * FROM user where email = '" + email + "';";
   
	sql.fetchData(qS, function(error, rows){
	   		done(null, {email: rows[0].email, firstname: rows[0].firstName, lastname: rows[0].lastName});
		
				})

		}


exports.root=root;
exports.deserializeUser = deserializeUser;
exports.serializeUser = serializeUser
exports.login=login;
exports.loginfail=loginfail;
exports.loginPost=loginPost;
exports.signup=signup;
exports.signupPost=signupPost;
exports.signupfail=signupfail;
exports.passportAauth = passportAauth;
exports.profile=profile;
exports.getAllSeller=getAllSeller;
exports.getAllCustomer=getAllCustomer;
exports.logout=logout;