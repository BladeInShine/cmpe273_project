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

	
}

function getProduct(req,res) {
	var prd=req.param('productid');
	var pdtSQL="select * from product where id='"+prd+"';";
	sql.fetchData(pdtSQL,function(error,result){
		console.log(result);
		res.render('selling',{
			isAuthenticate: req.isAuthenticated(),
			pdt:result,
			
		
	})
	
	})
	
	
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


