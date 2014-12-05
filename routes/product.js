/**
 * New node file
 */
/**
 * New node file
 */
var ejs = require('ejs');
var sql = require('../conn');
var connection= require('../conn');
var passpport=require('passport');


function getAllProduct(req,res) {
var proSQL="select * from product ;"
	if(req.user.email=="admin@ebay.com")
	{
	sql.fetchData(proSQL,function(error,result){
		var mes="";
		res.render('allPrd',{
			pro:result,
			mes:mes
			
			
		});
		
		
	})
	}
	else{
		 res.redirect('/login');
	}
	
}

function getProduct(req,res) {
	
	
	
}

function createProduct(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function deleteProduct(req,res) {
    var proid=req.body.proid;
    console.log(proid);
	var delpro="DELETE FROM product WHERE id='"+proid+"';";
	if(req.user.email=="admin@ebay.com")	
	{
		sql.fetchData(delpro,function(error,result){
	
		var mes="";
		if(error)
			{
			console.log("product not fount");
			mes="delete product error";
			}
		else{
			mes="product deleted";		
		}
		res.render('/product',{
			mes:mes
			
		})
		
	})
	}
	else{
		res.redirect('/login');
	}
	
	
}
function buyProduct(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

exports.getAllProduct=getAllProduct;
exports.getProduct=getProduct;
exports.createProduct=createProduct;
exports.deleteProduct=deleteProduct;
exports.buyProduct=buyProduct;


