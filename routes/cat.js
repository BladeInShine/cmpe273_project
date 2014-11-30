var ejs = require('ejs');
var sql = require('../conn');
var connection= require('../conn');
var passpport=require('passport');


function getAllCat(req,res) {
	
	var query= "select * from cat";
	var cat ='';
	console.log("get all function");
	
	sql.fetchData(query, function(error, result){
		for(var i=0; i < result.length; i++){
			cat +='<option value="'+result[i].catname+'">'+result[i].catname+'</option>';
		}
		console.log(cat);
		res.render('test',{isAuthenticate:req.isAuthenticated(),
			catopt: cat,
			});
	});
}

function getCat(req,res) {

}

function createCat(req,res) {
	console.log("create cat");
	var name = req.query.catName;
	var insertSQL = "INSERT INTO cat (catname) VALUES('"+name+"')";
	var selectSQL = "select * from cat where UPPER(categoryname) = UPPER('"+name+"')";
	console.log("create cat");
	
	sql.fetchData(selectSQL, function(error, result){
		sql.fetchData(insertSQL, function(error, result){
			res.redirect('/test');	
		});
	});	
}

function deleteCat(req,res) {
	var name = req.query.catName;
	var selectSQL = "select * from cat where UPPER(catname) = UPPER('"+name+"')";
	var deleteSQL = "DELETE FROM cat WHERE catname = '"+name+"'";
	sql.fetchData(selectSQL, function(error, result){
		sql.fetchData(deleteSQL, function(error, result){
			res.redirect('/test');	
		});
	});	
	
}

exports.getAllCat=getAllCat;
exports.getCat=getCat;
exports.createCat=createCat;
exports.deleteCat=deleteCat;


