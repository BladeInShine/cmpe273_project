var sql_con = require('../conn');
function getAllAuction(req, res){
	
	var qS = "select * from `cmpe273project`.`auction`;";

	sql_con.fetchData(qS, function(error, rows){
		
		res.render('index',{data: rows});
	});
}

function getAuction(req, res){}

function createAuction(req, res){}

function bidAuction(req, res){}

function deleteAuction(req, res){}

exports.getAllAuction = getAllAuction;
exports.getAuction = getAuction;
exports.createAuction = createAuction;
exports.bidAuction = bidAuction;
exports.deleteAuction = deleteAuction;