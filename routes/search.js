var sql_con = require('../conn');

function search(req, res){
	var key = req.query.keyword;
	var pquery = "select product.id as 'id', selling.id as 'sid', auction.id as 'aid', name, pictureurl, sellorauction, price, currentprice from cmpe273project.product join cmpe273project.selling join cmpe273project.auction where product.id=selling.product or product.id=auction.product and product.name like '%"+key+"%' group by id order by id desc";
	var ret = "";
	
	sql_con.fetchData(pquery, function(errors, rows){
		for(var i=0;i<rows.length;i++){

			if(rows[i].sellorauction=="sell"){
				ret+='<li id="item4ae0b9474b" _sp="p2045573.m1686.l3080" listingId="321597818699" class="sresult lvresult clearfix li" r="1" ><div class="lvpic pic p225 img left" iid="321597818699"><div class="lvpicinner full-width picW s225"><img height="225" width="225" src="'+rows[i].pictureurl+'" class="img"/></div></div><h3 class="lvtitle"><a href="/selling/'+rows[i].sid+'" class="vip">'+rows[i].name+'</a></h3><ul class="lvprices left space-zero"><li class="lvprice prc"><span  class="g-b">$'+rows[i].price.toFixed(2)+'</span></li><li class="lvextras"><div class="hotness bold"></div></li></ul></li>';

			}
			else{
				ret+='<li id="item4ae0b9474b" _sp="p2045573.m1686.l3080" listingId="321597818699" class="sresult lvresult clearfix li" r="1" ><div class="lvpic pic p225 img left" iid="321597818699"><div class="lvpicinner full-width picW s225"><img height="225" width="225" src="'+rows[i].pictureurl+'" class="img"/></div></div><h3 class="lvtitle"><a href="/auction/'+rows[i].aid+'" class="vip">'+rows[i].name+'</a></h3><ul class="lvprices left space-zero"><li class="lvprice prc"><span  class="g-b">$'+rows[i].currentprice.toFixed(2)+'</span></li><li class="lvextras"><div class="hotness bold"></div></li></ul></li>';

			}
			//ret+='<li id="item4ae0b9474b" _sp="p2045573.m1686.l3080" listingId="321597818699" class="sresult lvresult clearfix li" r="1" ><div class="lvpic pic p225 img left" iid="321597818699"><div class="lvpicinner full-width picW s225"><img height="225" width="225" src="'+pic+'" class="img"/></div></div><h3 class="lvtitle"><a href="http://www.ebay.com/itm/Brand-New-Factory-Sealed-Psv-Ps-Vita-Ultimate-Marvel-VS-Capcom-3-Region-Free-/321597818699?pt=Video_Games_Games&hash=item4ae0b9474b" class="vip">'+name+'</a></h3><ul class="lvprices left space-zero"><li class="lvprice prc"><span  class="g-b">$'+price.toFixed(2)+'</span></li><li class="lvextras"><div class="hotness bold"></div></li></ul></li>';

		}
		res.render('search',{isAuthenticate: req.isAuthenticated(),list: ret,user:req.user});
	});
}

exports.search = search;