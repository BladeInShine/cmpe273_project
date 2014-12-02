var sql_con = require('../conn');
function getAllSelling(req, res){
	
	var qS = "select * from `cmpe273project`.`selling`;";

	sql_con.fetchData(qS, function(error, rows){
		
		res.render('index',{data: rows});
	});
}

function createSelling(req, res){
	//if(!req.isAuthenticated()){res.redirect('/login');}
	console.log("Inside createSelling");

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
	var quantity = req.body.quantity;
	var soa = "sell";
	
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
		//var startPrice = req.body.startprice;
		var price = req.body.price;
		var inProgress = "true";
		
		var qS = "INSERT INTO `cmpe273project`.`selling` (`product`, `price`,`startdate`, `quantity`) VALUES ('" + productId + "', '" + price + "','" + startDate + "', '" + quantity + "');";

		sql_con.insert(qS);
		var qS3 = "SELECT * FROM `cmpe273project`.`selling` WHERE product = '" + productId + "' and price = '" + price + "' and startdate = '" + startDate + "' and quantity = '" + quantity + "';";

		sql_con.fetchData(qS3, function(error, rows2){
			
			var sellingId = parseInt(rows2[0].id);
			
			res.redirect('/selling/' + sellingId);
			//res.render('selling',{email : "a", productname: name, condition: condition, price: price, pictureurl: pictureUrl, productid: productId});
		});
			
		
	});
	

}

function deleteSelling(req, res){}

function buyProduct(req,res){
	var pictureUrl = req.query.picUrl;
	var price = req.query.p;
	res.render('sell',{pic:pictureUrl,price:price});
}

function getSelling(req,res){
	console.log("sellinggggggg");
	var sellingId = req.params.sellingid;
	
	var qS = "SELECT * FROM `cmpe273project`.`selling` WHERE id = '" + sellingId + "';";

	sql_con.fetchData(qS, function(error, rows){
		
		if(rows != null && rows.length > 0){
			
			qS2 = "SELECT * FROM `cmpe273project`.`product` WHERE id = '" + rows[0].product + "';";
			
			sql_con.fetchData(qS2, function(error, rows2){
				
				var quantity = rows[0].price;
				var condition = rows2[0].condi;
				var name = rows2[0].name;
				var price = rows[0].price;
				var pictureUrl = rows2[0].pictureurl;
			
				res.render('selling',{email : "a", productname: name, condition: condition, price: price, pictureurl: pictureUrl});
			});
		}

	});
}

function createSellingPage(req,res){
	if(false){res.redirect('/login');}
	
		else{
			
			var qS = "SELECT * FROM cmpe273project.cat;";
		
			sql_con.fetchData(qS, function(error, rows){
				
				res.render('sellingcreation', {cats: rows});
				
			});
	
		}
}

exports.getAllSelling = getAllSelling;
exports.createSelling = createSelling;
exports.deleteSelling = deleteSelling;
exports.buyProduct = buyProduct;
exports.getSelling = getSelling;
exports.createSellingPage = createSellingPage;