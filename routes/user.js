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
	user:req.user,
	mes:""
})}
function loginfail(req,res){
	
	res.render('login',{
		mes:"Your email/username or password is incorrect."
		
	});
	
	
	
} 
function signupfail(req,res){
	
	
	res.render('signup',{
		mes:"Your email address is already registered with eBay."
	});
	
}

function loginPost(req,res){
	//passport.authenticate('local');
	
	if(req.user.email=="admin@ebay.com")
		{
		res.render('admin',
		{
			user:req.user
			});
		}
	else{	
		res.redirect('/');
		}
		
    console.log("/ligin POST is requested.");
    console.log(req.user);
//    var catQuery= "select * from cat";
//    sql.fetchData(catQuery, function(error, result){
//    	if(result.length==0)
//    		{
//    		res.redirect("loginfial");
//    		}
//    res.render('index',{
//    	user: req.user,
//		isAuthenticate: req.isAuthenticated(),
//		cat:result
//	});	
//    })
  
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
		
		else if(rows[0].password == password)
		{
			done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname});
		}
		else
		{

			done(null, null);
		}
		
	});
}
  
function signup(req,res){

	res.render('signup',{
		isAuthenticate: req.isAuthenticated(),
		mes:""
		
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
var emailsql="select email from user where email='"+email+"';";
sql.fetchData(emailsql,function(error,result){
	if(result.length>0)
		{
		res.redirect("/signupfail");
		}
	else{
var userSQL = "INSERT INTO user (`email`, `password`, `firstName`, `lastName`,`address`,`city`,`state`,`zip` ) VALUES ('" + email + "', '" + pwd + "', '" + first + "', '" + last + "','"+ address +"','"+city+"','"+state+"','"+zip+"');";
sql.fetchData(userSQL,function(error,callback){
console.log(callback);
console.log("error:"+error);

res.redirect('/login');
})
	}
})
}

function profile(req,res){
if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}

var rewSQL = "select * from user where userid='"+req.user.userid+"';";

connection.fetchData(rewSQL,function(error, rewData){
	var id=req.user.userid;
	var meID="";
	if(id <10)
		{
		meID="100-00-000";
		}
	else if(id>=10&&id<100)
		{
		meID="100-00-00";
		}
	else if(id>=100&id<1000){
		meID="100-00-0";
	}
	else if(id>=1000&id<10000)
		{
		meID="100-00-"
		}
	
	res.render('myebay',{
	user:req.user,
	isAuthenticate: req.isAuthenticated(),
	info:rewData,
	memID:meID
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
	var user=req.user.userid;
	var hisSQL="select owner,date,name,description,price from cmpe273project.user join cmpe273project.buying join cmpe273project.selling join cmpe273project.product where user.userid=buying.buyer and buying.selling = selling.id and selling.product =product.id and user.userid="+user+";";	
	
    sql.fetchData(hisSQL,function(error,result){
     
    	var ownerSQL="select "
    	res.render('purHis',{
    		
    		data:result,
    		user:req.user,
    		
    		
    	})
    	
    	
    	
    })
	
	
}
function sellHis(req,res){
	if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}
	var user=req.user.userid;
	var hisSQL="select selling.id as 'sellid',product.id as'pdtid', startdate,name,description,price,quantity , product.pictureurl as'url'from cmpe273project.user join cmpe273project.selling join cmpe273project.product where user.userid=product.owner and selling.product =product.id and user.userid="+user+";";
	console.log(req.user.id);
    sql.fetchData(hisSQL,function(error,result){
    	console.log(result);
    	res.render('sellhis',{
    		
    		data:result,
    		user:req.user,
    		
    		
    	})
    	
    	
    	
    })
	
	
}
function profileUpdate(req,res){
	if(!req.isAuthenticated())
	 {
		 res.redirect('/login');
		}
	var userInfo="select * from user where userid="+req.user.userid+";";
	sql.fetchData(userInfo,function(error,result)
	{  console.log(result);
		res.render('editInfo',{
			user:result[0]
			
		});
		
	}		
	
	
	)
	
	
}

function profileUpdatePost(req,res){
	var pwd = req.body.password;  
	var first = req.body.firstname;
	var last = req.body.lastname;
	var address=req.body.address;
	var city=req.body.city;
	var state=req.body.state;
	var zip=req.body.zip;
	var userSQL = "update user set password='"+pwd+"',firstname='"+first+"',lastname='"+last+"',address='"+address+"',city='"+city+"',state='"+state+"',zip='"+zip+"';";
	sql.fetchData(userSQL,function(error,result){
		
		
		
	 res.redirect('/profile');
		console.log(result);
		
		
	})
	
}



function serializeUser(user,done){
	done(null,user.email);
	
}
 
function deserializeUser(email,done){
  
  
  var qS = "SELECT * FROM user where email = '" + email + "';";
	sql.fetchData(qS, function(error, rows){

	//	console.log("In passport.deserializeUser: email is " + rows[0].email);
		done(null, {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname, zipcode: rows[0].zipcode, lastlogintime: rows[0].lastlogintime,userid:rows[0].userid});
	});
	}
//})		
//}

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
exports.profileUpdatePost=profileUpdatePost;
exports.profileUpdate=profileUpdate;

exports.sellHis=sellHis;