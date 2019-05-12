let http = require('http');
let fs =  require('fs');
const fixurl = 'https://www.youtube.com/results?search_query=';
let finalurls = [];


var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('file.txt')
});

lineReader.on('line', function (line) {
	
		//	host: `https://www.youtube.com/results?search_query=${line}`,
	let otherUlr=`http://www.youtube.com/results?search_query=${line}`;
	console.log('console log: '+otherUlr);

	http.get(otherUlr,function(res,err){
	//console.log(res);
	});


});


//var options = {
//	host: 'https://www.youtube.com/results?search_query=',
//	  port: 80,
//	  path: '/upload',
//	  method: 'GET'
//};
