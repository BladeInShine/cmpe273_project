/**
 * New node file
 */

var mysql = require('mysql');

var Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');

var av = [true, true, true, true, true, true, true, true, true, true];

var cons = [];

function getCon(){
	
	if(cons.length === 0){
		
		console.log("Init connection pool.");
		for(var j = 0; j < 10; j ++){
			
			cons[j] = mysql.createConnection({
				host : 'localhost',
				user : 'root',
				password : '12345678',
				port : '3306',
				database : 'cmpe273project'
				});
		}
	}
	
	while(true){
		for(var i = 0; i < 10; i ++){
		
			if(av[i] === true){
			
				av[i] = false;
				console.log(i + "th connection is leased.");
				var result = [cons[i], i];
				return result;
			}
		}
	}
}

function returnCon(i){
	
	console.log(i + "th connection is returned.");
	av[i] = true;
}

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '12345678',
	port : '3306',
	database : 'cmpe273project'
	});


function fetchData(sqlQuery, callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var conn = getCon();
	
	var i = conn[1];
	
	conn[0].query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{
			callback(err, rows);
		}
	});
	
	returnCon(i);
}


function fetchDataC(sqlQuery, callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var sqlQueryAfter = sqlQuery.replace(/\s+/g, '');
	
	memcached.get(sqlQueryAfter, function (err, result) {
		
		if(err || result == null){
			
			console.log("There is no such data");
			
			var conn = getCon();
			
			var i = conn[1];
			
			conn[0].query(sqlQuery, function(err, rows, fields) {
				if(err){
					console.log("ERROR: " + err.message);
				}
				else
				{
					memcached.set(sqlQueryAfter, rows, 10, function (err) { /* stuff */ });
					callback(err, rows);
				}
			});
			
			returnCon(i);
		}
		else{
			
			console.log("There is such data");
			console.log(result);
			callback(err, result);
		}
		  
	});
}

function insert(qS){
	
	var conn = getCon();
	
	var i = conn[1];
	
	console.log("\nSQL Query::" + qS);
	conn[0].query(qS);
	returnCon(i);
}


function query(queryS, con){

	con.query(queryS, function (err, rows, fields) {
		if (err) throw err;
		if(rows.length !== 0){
			
			console.log("DATA: " + rows[0].password);
		}
		else{console.log("Empty data");}
	});
}


exports.query = query;
exports.connection = connection;
exports.fetchData = fetchData;
exports.fetchDataC = fetchDataC;
exports.insert = insert;
exports.getCon = getCon;
exports.returnCon = returnCon;