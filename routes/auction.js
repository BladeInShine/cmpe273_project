var sql_con = require('../conn'),
	fs   = require('fs');
	

function getAllAuction(req, res){
	
	console.log("Hi");
	var qS = "select * from `cmpe273project`.`auction`;";

	sql_con.fetchData(qS, function(error, rows){
		
		res.render('index',{data: rows});
	});
}

function getAuction(req, res){
	console.log("papapa");
	var auctionId = req.params.auctionid;
	
	var qS = "SELECT * FROM `cmpe273project`.`auction` WHERE id = '" + auctionId + "';";

	sql_con.fetchData(qS, function(error, rows){
		
		if(rows != null && rows.length > 0){
			
			qS2 = "SELECT * FROM `cmpe273project`.`product` WHERE id = '" + rows[0].product + "';";
			
			sql_con.fetchData(qS2, function(error, rows2){
				
				var currentPrice = rows[0].currentprice;
				var condition = rows2[0].condi;
				var name = rows2[0].name;
				var addPrice = rows[0].addprice;
				var bidNum = rows[0].bidnum;
				var pictureUrl = rows2[0].pictureurl;
				res.render('auction',{email : "a", productname: name, currentprice: currentPrice, condition: condition, addprice: addPrice, bidnum: bidNum, pictureurl: pictureUrl, auctionid: auctionId});
			});
		}

	});
}

function createAuction(req, res){
	
	//if(!req.isAuthenticated()){res.redirect('/login');}
	console.log("Inside createAuction");

	console.log(req.files);

	var len = req.files.image.path.length;
	var pictureUrl = req.files.image.path.substring(42,len);
	var name = req.body.productname; 
	var des = req.body.des;
	var owner = 2;
	var cat = req.body.cat;
	var condition = req.body.condition;
	var soa = "auction";
	
	var qS = "INSERT INTO `cmpe273project`.`product` (`name`, `description`, `owner`, `cat`, `pictureurl`, `sellorauction`, `condi`) VALUES ('" + name + "', '" + des + "', 1, '" + cat + "', '" + pictureUrl + "', '" + soa + "', '" + condition + "');";
	sql_con.insert(qS);
	
	var qS2 = "SELECT * FROM `cmpe273project`.`product` WHERE name = '" + name + "' and description = '" + des + "' and owner = 1 and cat = '" + cat + "' and pictureurl = '" + pictureUrl + "' and sellorauction = '" + soa + "' and condi = '" + condition + "';";
	
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
		
		var qS3 = "SELECT * FROM `cmpe273project`.`auction` WHERE product = '" + productId + "' and startdate = '" + startDate + "' and seller = '" + seller + "' and startprice = '" + startPrice + "' and addprice = '" + addPrice + "' and inprogress = '" + inProgress + "' and currentprice = '" + startPrice + "' and bidnum = '" + 0 + "';";

		sql_con.fetchData(qS3, function(error, rows2){
			
			var auctionId = parseInt(rows2[0].id);
			//res.render('auctiondetail',{email : "a", productname: name, currentprice: startPrice, condition: condition, addprice: addPrice, bidnum: 0, pictureurl: pictureUrl, auctionid: auctionId});
			res.redirect('/auction/' + auctionId);
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

function getBid(req, res){
	
	var auctionId = req.params.auctionid;
	
	qS = "SELECT * FROM `cmpe273project`.`bid` WHERE auction = " + auctionId + ";";
	sql_con.fetchData(qS, function(error, rows){

		qS2 = "SELECT * FROM `cmpe273project`.`auction` WHERE id = " + auctionId + ";";
		sql_con.fetchData(qS2, function(error, rows2){
			
			var bidNum = rows2[0].bidnum;
			var startPrice = rows2[0].startprice;
			var startDate = rows2[0].startdate;
			res.render('bids', {bids: rows, bidnum: bidNum, startprice: startPrice, startdate: startDate});
		});
		
});

}

function bidAuction(req, res){
	
	var auctionId = req.params.auctionid;
	var qS = "SELECT * FROM `cmpe273project`.`auction` WHERE id = " + auctionId + ";";
	sql_con.fetchData(qS, function(error, rows){
		var auctionId = req.params.auctionid;
		var currentPrice = rows[0].currentprice;
		var bidNum = parseInt(rows[0].bidnum) + 1;
		var price = rows[0].addprice + currentPrice;
		var bidder = 'a';
		
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var date = month + "/" + day + "/" + year;
		
		qS2 = "INSERT INTO `cmpe273project`.`bid` (`auction`, `price`, `bidder`, `date`, `finalbid`) VALUES ('" + auctionId + "', " + price + ", '" + bidder + "' , '" + date + "', '" + false + "');";
		sql_con.insert(qS2);
		
		qS3 = "UPDATE `cmpe273project`.`auction` SET `bidnum`='" + bidNum + "' WHERE `id`='"+ auctionId + "';";
		sql_con.insert(qS3);
		
		qS3 = "UPDATE `cmpe273project`.`auction` SET `currentprice`='" + price + "' WHERE `id`='"+ auctionId + "';";
		sql_con.insert(qS3);
		res.redirect('/bid/' + auctionId);
	});
	
}

function deleteAuction(req, res){}

exports.getAllAuction = getAllAuction;
exports.getAuction = getAuction;
exports.createAuction = createAuction;
exports.createAuctionPage = createAuctionPage;
exports.bidAuction = bidAuction;
exports.deleteAuction = deleteAuction;
exports.getBid = getBid;