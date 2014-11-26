var sql_con = require('../conn');
function getAllSelling(req, res){
	
	var qS = "select * from `cmpe273project`.`selling`;";

	sql_con.fetchData(qS, function(error, rows){
		
		res.render('index',{data: rows});
	});
}

function createSelling(req, res){}

function deleteSelling(req, res){}

function buyProduct(req,res){}

function getSelling(req,res){}

exports.getAllSelling = getAllSelling;
exports.createSelling = createSelling;
exports.deleteSelling = deleteSelling;
exports.buyProduct = buyProduct;
exports.getSelling = getSelling;