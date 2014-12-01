var sql_con = require('../conn'),
	fs   = require('fs');
	

function getAllAuction(req, res){
	
	console.log("Hi");
	var qS = "select * from `cmpe273project`.`auction`;";

	sql_con.fetchData(qS, function(error, rows){
		
		res.render('index',{data: rows});
	});
}

function getAuction(req, res){}

function createAuction(req, res){
	
	//if(!req.isAuthenticated()){res.redirect('/login');}
	console.log("Inside createAuction");

	console.log(req.files);
	
//	fs.readFile(req.files.image.path, function (err, data) {
//		  // ...
//		  var newPath = __dirname + "/images/";
//		  fs.writeFile(newPath, data, function (err) {
//		  });
//		});

	var len = req.files.image.path.length;
	var pictureUrl = req.files.image.path.substring(42,len);
	var name = req.body.productname; 
	var des = req.body.des;
	var owner = 1;
	var cat = req.body.cat;
	var condition = req.body.condition;
	var soa = "auction";
	
	var qS = "INSERT INTO `cmpe273project`.`product` (`name`, `description`, `owner`, `cat`, `pictureurl`, `sellorauction`, `condi`) VALUES ('" + name + "', '" + des + "', '" + owner + "', '" + cat + "', '" + pictureUrl + "', '" + soa + "', '" + condition + "');";
	sql_con.insert(qS);
	
	var qS2 = "SELECT * FROM `cmpe273project`.`product` WHERE name = '" + name + "' and description = '" + des + "' and owner = '" + owner + "' and cat = '" + cat + "' and pictureurl = '" + pictureUrl + "' and sellorauction = '" + soa + "' and condi = '" + condition + "';";
	
	sql_con.fetchData(qS2, function(error, rows){
		
		console.log("rows size: " + rows.length);
		var productId = parseInt(rows[0].id);
		console.log("Id is " + productId);
		
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var date = month + "/" + day + "/" + year;
		
		var startDate = date;
		var seller = 1;
		var startPrice = req.body.startprice;
		var addPrice = req.body.addprice;
		var inProgress = "true";
		
		var qS = "INSERT INTO `cmpe273project`.`auction` (`product`, `startdate`, `seller`, `startprice`, `addprice`, `inprogress`, `currentprice`, `bidnum`) VALUES ('" + productId + "', '" + startDate + "', '" + seller +  "', '" + startPrice + "', '" + addPrice + "', '" + inProgress + "', '" + startPrice + "', '" + 0 + "');";

		sql_con.insert(qS);
		
		var qS3 = "SELECT * FROM `cmpe273project`.`auction` WHERE product = '" + productId + "' and startdate = '" + startDate + "' and seller = '" + seller + "' and startprice = '" + startPrice + "' and addprice = '" + addPrice + "' and inprogress = '" + inProgress + "' and currentprice = '" + 0 + "' and bidnum = '" + 0 + "';";

		sql_con.fetchData(qS2, function(error, rows2){
			
			var auctionId = parseInt(rows[0].id);
			res.render('auction',{email : "a", productname: name, currentprice: startPrice, condition: condition, addprice: addPrice, bidnum: 0, pictureurl: pictureUrl, auctionid: auctionId});
		
		});
		
		
			
		//res.render('auction');
	});
	

	}

function createAuctionPage(req, res){
	
	if(false){res.redirect('/login');}
	
	else{
		
		var qS = "SELECT * FROM cmpe273project.cat;";
		
		sql_con.fetchData(qS, function(error, rows){

			res.render('auctioncreation', {cats: rows});
	});
	
	}
}

function getBid(req, res){}

function bidAuction(req, res){}

function deleteAuction(req, res){}

exports.getAllAuction = getAllAuction;
exports.getAuction = getAuction;
exports.createAuction = createAuction;
exports.createAuctionPage = createAuctionPage;
exports.bidAuction = bidAuction;
exports.deleteAuction = deleteAuction;
exports.getBid = getBid;