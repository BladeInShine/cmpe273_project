var ejs = require('ejs');
var sql = require('../conn');
var connection= require('../conn');
var passpport=require('passport');
var pdts=[];
function getAllCat(req,res) {
	var proSQL="select * from cat ;"
		if(req.user.email=="admin@ebay.com")
			{	
			 sql.fetchData(proSQL,function(error,result){
					var mes="";
					res.render('allcat',{
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


var catSQL="select product.id as 'pdtid',selling.id as 'sellid',auction.id as 'aucid' ,name,sellorauction ,pictureurl from cmpe273project.product join cmpe273project.selling join cmpe273project.auction where ( product.id=selling.product or product.id=auction.product) and 1 limit 20 and cat='"+catname+"'group by pdtid;";
console.log("sql"+catSQL);
sql.fetchData(catSQL,function(error,result){
	
	console.log(result);
	res.render('oneCat',{
		pdts:result,
		isAuthenticate: req.isAuthenticated(),
		cat:catname,
		user:req.user
	})
	
	
})
		

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
	var selectSQL = "select * from cat where catname = '"+name+"'";
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


