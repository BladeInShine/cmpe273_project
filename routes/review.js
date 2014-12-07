var sql_con = require('../conn');

function getReviewPage(req, res){
	var sid = req.params.sellingid;
	var pQuery = "select * from cmpe273project.selling join cmpe273project.product join cmpe273project.user where selling.product=product.id and product.owner=user.userid and selling.id="+sid;
	sql_con.fetchData(pQuery, function(errors, rows){
		var sidin = '<input type="hidden" name="selling" value='+sid+' >';
		var uin = '<input type="hidden" name="user" value='+req.user.email+' >';
		var ppicin = '<a href="http://myworld.ebay.com/paypal_digital_gifts"><img src="'+rows[0].pictureurl+'" alt="User Avatar" id="myimg" border="0"></a>';
		var pnamein = '<a title="Member id paypal_digital_gifts" href="http://myworld.ebay.com/paypal_digital_gifts"><span class="mbg-nw">'+rows[0].name+'</span></a>';
		var sell = rows[0].firstname.charAt(0)+". "+rows[0].lastname;
		
		res.render('writeReview',{sidin: sidin, userin: uin, picin: ppicin, pname: pnamein, seller: sell});
	});
}


function createReview(req, res){
	var sid = req.body.selling;
	var uid = req.body.user;
	var rating = req.body.rate;
	var rev = req.body.review;
	var date = new Date();
	
	var m = date.getMonth()+1;
	var y = date.getFullYear();
	var datestr = date.getDate()+"/"+m+"/"+y;
	
	var query = "INSERT INTO `cmpe273project`.`review` (`selling`, `rate`, `date`, `comments`, `user`) VALUES ('"+sid+"', '"+rating+"', '"+datestr+"', '"+rev+"', '"+uid+"');";
	sql_con.fetchData(query,function(errors, rows){
		res.redirect('/');
	});
}


function getReview(req, res){
	var uid = req.params.userid;
	var query = "select * from cmpe273project.user where userid="+uid;
	var qS = "select * from cmpe273project.review join cmpe273project.selling join cmpe273project.product join cmpe273project.user where selling=selling.id and product = product.id and owner=userid and owner="+uid;
	sql_con.fetchData(query,function(error,data){
		var user = data[0].firstname.charAt(0)+". "+data[0].lastname;
		sql_con.fetchData(qS, function(error, rows){
			
			var rev = "";
			var src = "";
			if(rows.length>0){
				
				for(var i=0;i<rows.length;i++){
					var rate = rows[i].rate;
					if(rate=='1'){
						src = "http://q.ebaystatic.com/aw/pics/icon/iconPos_16x16.gif";
					}
					else if(rate=='0'){
						src = "http://q.ebaystatic.com/aw/pics/icon/iconNeu_16x16.gif";
					}
					else if(rate=='2'){
						src = "http://q.ebaystatic.com/aw/pics/icon/iconNeg_16x16.gif";
					}
					rev+='<tr><td><img src="'+src+'" height="16" width="16"></td><td>'+rows[i].comments+'</td><td nowrap="nowrap" id="memberBadgeId">Buyer:<div class="mbg"><span class="mbg-nw">'+rows[i].user.charAt(0)+rows[i].user.charAt(1)+'***</span></div></td></tr><tr class="bot"><td>&nbsp;</td><td>'+rows[i].name+'</td><td>$ '+rows[i].price.toFixed(2)+'</td></tr>';
				}
			}
			
			res.render('getReview',{review: rev, uname: user, user:req.user, isAuthenticate: req.isAuthenticated()});
		});
	});
	
}


function deleteReview(req, res){
	
}


exports.getReviewPage = getReviewPage;
exports.createReview = createReview;
exports.getReview = getReview;
exports.deleteReview = deleteReview;