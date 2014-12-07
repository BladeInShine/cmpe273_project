var sql_con = require('../conn');

function getCart(req, res){
	var uid = req.params.userid;
	var query = "select * from cmpe273project.cart join cmpe273project.selling join cmpe273project.product join cmpe273project.user where selling.id=cart.sellingid and product.id=cart.productid and user.userid=cart.userid and user.userid="+uid;
	var list = "";
	var price=0;
	
	sql_con.fetchData(query, function(errors,rows){
		for(var i=0;i<rows.length;i++){
			price+=rows[i].price*rows[i].num;
			list += '<p><div id="sellerBucket_best_buy" class="fl col_100p"><div class="fl cart_sci b-ddd bgclr-fcfcfc col_100p" id="sc_best_buy"><div class="fl lalign ralign mw851px"><div id="best_buy-itemGroup1" class="fl col_100p clearfix"><div class="fl  col_100p "><div id="best_buy-itemGroup1-item1" class="fl col_100p clearfix"><div id="16065152282" class="  fl col_100p talign balign clearfix" data-qty="1" data-displayorder="1" data-hasmsg="false" data-itemid="321583336860" data-varid="0"><div class="fr col_100p clearfix"><div class="fl"><div class="imgcol140"><div class="sci-imgCont img140"><a class="imganchor" href="/selling/'+rows[i].sellingid+'"><span class="l-shad lftd w140 h140"><span class="w140 h140 lh140"><span class="imgt w140 h140"><img border="0" src="'+rows[i].pictureurl+'"data-echo="'+rows[i].pictureurl+'" class="lazyload mw140 mh140"></span></span></span></a></div></div></div><div class="fr  itemInfoColcart140 clearfix"><div class="fl col_100p clearfix"><div class="fl prltv infocolcart140"><div class="mr10"><div class="ff-ds3 fs16 mb5 fw-n sci-itmttl"><a href="/selling/'+rows[i].sellingid+'">'+rows[i].name+'</a></div></div></div><div class="fr dib qtyColWrapper140"><div class="fr pb30 col_100p qtyRow"><span class="fr tr m0 p0 ff-ds3 fs16 clr000 prcol140 pb15"><div class="fw-b">'+rows[i].num+' * $'+rows[i].price.toFixed(2)+'</div></span></div></div></div></div></div><div class="fr col_100p clearfix"><div class="fr col_100p prltv"><div class="tr"><a href="/delItem/'+rows[i].cartid+'">Remove</a></div></div></div><div class="ie7mb15"></div></div></div></div></div></div></div><div class="fl sellerSeperatorRow col_100p">&nbsp;</div></div></p>';
		}
		res.render('cart',{isAuthenticate: req.isAuthenticated(), clist: list, price: price.toFixed(2), user:req.user});
	});
}

function delItem(req, res){
	var cid = req.params.cartid;
	var delQuery = "delete from cmpe273project.cart where cartid="+cid;
	
	sql_con.fetchData(delQuery, function(errors,rows){
		var query = "select * from cmpe273project.user where email='"+req.user.email+"'";
		sql_con.fetchData(query, function(errors,data){
			var red = "/cart/"+data[0].userid;
			res.redirect(red);
		});
	});
}

exports.getCart = getCart;
exports.delItem = delItem;