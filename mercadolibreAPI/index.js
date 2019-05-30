const config = require('config');
var express = require('express'); // Express web server framework
var fs = require('fs');
var request = require('request'); // "Request" library
var app = express();

//cnofiguration

var url ='https://api.mercadolibre.com/sites/MLA/search?q=';
var token = config.get('meliToken');



//app.get('/login', function(req, res) {
	var realUrl = buildUrl('bilea Twister');

	request(realUrl, function(error,response,html){
		var result = JSON.parse(response.body).results;
		result.forEach( (item)=>{
			console.log(item.title);
			console.log(item.price);
		});

	});
//});

function buildUrl(query){
	return url+query+token;
}


console.log('Listening on 8888');
app.listen(8888);
