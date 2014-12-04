var ejs = require('ejs');
var sql = require('../conn');
var connection= require('../conn');
var passpport=require('passport');
var cat=require('./cat'); 
function root(req,res){
  
	var catQuery= "select catname from cat";
sql.fetchData(catQuery, function(error, result){
		
		
	res.render('index',{
		isAuthenticate:req.isAuthenticated(),
		user:req.user,
		cat:result
	});
});
}

function login (req,res) {
	
res.render('login',{
	isAuthenticate: req.isAuthenticated(),
	user:req.user,
})}
function loginfail(req,res){
	
	res.render('loginfail');
	
	
	
} 
function signupfail(req,res){
	console.log("inside signup failure");
	
	res.render('signupfail');
	
}

function loginPost(req,res){
	//passport.authenticate('local');
	if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}
	if(req.user.email=="admin@ebay.com")
		{
		res.render('admin',
		{
			user:req.user
			});
		}
		
		
    console.log("/ligin POST is requested.");
    console.log(req.user);
    var catQuery= "select * from cat";
    sql.fetchData(catQuery, function(error, result){
    	if(result.length==0)
    		{
    		res.redirect("loginfial");
    		}
    res.render('index',{
    	user: req.user,
		isAuthenticate: req.isAuthenticated(),
		cat:result
	});	
    })
  
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
		if(rows.length==0)
		{
			done(null,null);
			
		}
		
		else (rows[0].password == password)
		{
			done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname});
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
var address=req.body.address;
var city=req.body.city;
var state=req.body.state;
var zip=req.body.zip;
console.log("address"+address);
console.log("city"+city);
console.log("state"+state);
console.log("zip"+zip);
var userSQL = "INSERT INTO user (`email`, `password`, `firstName`, `lastName`,`address`,`city`,`state`,`zip` ) VALUES ('" + email + "', '" + pwd + "', '" + first + "', '" + last + "','"+ address +"','"+city+"','"+state+"','"+zip+"');";
sql.fetchData(userSQL,function(error,callback){
console.log(callback);
console.log("error:"+error);
//sql.fetchData(userSQL,function(error,callback){
//
//})
res.render('login');
})
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
function getAllCustomer(req,res){
	var proSQL="select * from user ;"
if(req.user.email=="admin@ebay.com")
	{	
	 sql.fetchData(proSQL,function(error,result){
			
			res.render('allUser',{
				user:result
				
				
			});
			
			
		})	
	}
 else {
	 res.redirect('/login');
}
	
	
}
function purHis(req,res){
	if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}
	var user=req.user.email;
	var hisSQL="select owner,date,name,description,price from cmpe273project.user join cmpe273project.buying join cmpe273project.selling join cmpe273project.product where user.email=buying.buyer and buying.selling = selling.id and selling.product =product.id and user.email='"+user+"';";
	
    sql.fetchData(hisSQL,function(error,result){
    	
    	res.render('purHis',{
    		
    		data:result,
    		user:req.user,
    		
    		
    	})
    	
    	
    	
    })
	
	
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
exports.purHis=purHis;