var sql_con = require('../conn');

 var price =0;

function search(req, res){
	var key = req.params.keyword;
	var pquery = "select * from cmpe273project.product where name like '%"+key+"%'";
	var ret = "";
	
	sql_con.fetchData(pquery, function(errors, rows){
		for(var i=0;i<rows.length;i++){
			var pic = rows[i].pictureurl;
			var name = rows[i].name;

			if(rows[i].sellorauction=="sell"){
				var squery = "select * from cmpe273project.selling where selling.product="+rows[i].id;
				sql_con.fetchData(squery, function(errors, data){
					price = data[0].price;
					console.log("sell"+price);
					
					//ret+='<li id="item4ae0b9474b" _sp="p2045573.m1686.l3080" listingId="321597818699" class="sresult lvresult clearfix li" r="1" ><div class="lvpic pic p225 img left" iid="321597818699"><div class="lvpicinner full-width picW s225"><img height="225" width="225" src="'+pic+'" class="img"/></div></div><h3 class="lvtitle"><a href="http://www.ebay.com/itm/Brand-New-Factory-Sealed-Psv-Ps-Vita-Ultimate-Marvel-VS-Capcom-3-Region-Free-/321597818699?pt=Video_Games_Games&hash=item4ae0b9474b" class="vip">'+name+'</a></h3><ul class="lvprices left space-zero"><li class="lvprice prc"><span  class="g-b">$'+data[0].price.toFixed(2)+'</span></li><li class="lvextras"><div class="hotness bold"></div></li></ul></li>';
				});
			}
			else{
				var squery = "select * from cmpe273project.auction where auction.product="+rows[i].id+" group by auction.product";
				sql_con.fetchData(squery, function(errors, data){
					price = data[0].price;
					console.log(price);
					console.log(data[0].price);
					//ret+='<li id="item4ae0b9474b" _sp="p2045573.m1686.l3080" listingId="321597818699" class="sresult lvresult clearfix li" r="1" ><div class="lvpic pic p225 img left" iid="321597818699"><div class="lvpicinner full-width picW s225"><img height="225" width="225" src="'+pic+'" class="img"/></div></div><h3 class="lvtitle"><a href="http://www.ebay.com/itm/Brand-New-Factory-Sealed-Psv-Ps-Vita-Ultimate-Marvel-VS-Capcom-3-Region-Free-/321597818699?pt=Video_Games_Games&hash=item4ae0b9474b" class="vip">'+name+'</a></h3><ul class="lvprices left space-zero"><li class="lvprice prc"><span  class="g-b">$'+data[0].price.toFixed(2)+'</span></li><li class="lvextras"><div class="hotness bold"></div></li></ul></li>';
				});
			}
			console.log("last"+price);
			ret+='<li id="item4ae0b9474b" _sp="p2045573.m1686.l3080" listingId="321597818699" class="sresult lvresult clearfix li" r="1" ><div class="lvpic pic p225 img left" iid="321597818699"><div class="lvpicinner full-width picW s225"><img height="225" width="225" src="'+pic+'" class="img"/></div></div><h3 class="lvtitle"><a href="http://www.ebay.com/itm/Brand-New-Factory-Sealed-Psv-Ps-Vita-Ultimate-Marvel-VS-Capcom-3-Region-Free-/321597818699?pt=Video_Games_Games&hash=item4ae0b9474b" class="vip">'+name+'</a></h3><ul class="lvprices left space-zero"><li class="lvprice prc"><span  class="g-b">$'+price+'</span></li><li class="lvextras"><div class="hotness bold"></div></li></ul></li>';

		}
		res.render('search',{list: ret})
	});
}

exports.search = search;