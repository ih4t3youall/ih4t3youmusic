var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'b15664fe4eb845fcba07e1eddb2185ce'; // Your client id
var client_secret = '38ca5fbc68594e4e84b40a0dcb13f89c'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri


var options = {
	url: 'https://api.spotify.com/v1/me',
	headers: { 'Authorization': 'Bearer ' + access_token },
	json: true
};

request.get(options, function(error, response, body) {
	console.log(body);
});
