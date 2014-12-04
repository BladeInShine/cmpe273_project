var ejs = require('ejs');
var sql = require('../conn');
var connection= require('../conn');
var passpport=require('passport');


function getAllCat(req,res) {
	var proSQL="select * from cat ;"
		if(req.user.email=="admin@ebay.com")
			{	
			 sql.fetchData(proSQL,function(error,result){
					var mes="";
					res.render('allCat',{
						cat:result,
						mes:mes
						
					});
					
					
				})	
			}
		 else {
			 res.redirect('/login');
		}
			
}

function getCat(req,res) {
var catname=req.param('catname');
console.log("catname:"+catname);

var pdtSQL="select * from product where cat='"+catname+"';";
var catQuery= "select * from cat";
sql.fetchData(catQuery, function(error, cats){

	sql.fetchData(pdtSQL,function(error,result){
	
		res.render('oneCat',{
			isAuthenticate: req.isAuthenticated(),
			pdts:result,
			catname:catname,
		    cat:cats,
		    user:req.user
		
	})
	
	
	
});
});
		


}

function createCat(req,res) {
	console.log("create cat");
	var name = req.param('catname');
	var insertSQL = "INSERT INTO cat (catname) VALUES('"+name+"')";
	var selectSQL = "select * from cat where UPPER(categoryname) = UPPER('"+name+"')";
	console.log("create cat");
	
	sql.fetchData(selectSQL, function(error, result){
		sql.fetchData(insertSQL, function(error, result){
			res.redirect('/');	
		});
	});	
}

function deleteCat(req,res) {
	var name = req.param('catname');
	var selectSQL = "select * from cat where UPPER(catname) = UPPER('"+name+"')";
	var deleteSQL = "DELETE FROM cat WHERE catname = '"+name+"'";
	sql.fetchData(selectSQL, function(error, result){
		sql.fetchData(deleteSQL, function(error, result){
			res.redirect('/');	
		});
	});	
	
}
exports.getAllCat=getAllCat;
exports.getCat=getCat;
exports.createCat=createCat;
exports.deleteCat=deleteCat;


