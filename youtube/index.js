var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Set = require("collections/set");
var app     = express();
var videoUrls = new Set();
var defaultUrl = "https://www.youtube.com";
var myVariable ="";
var songs =[];

app.get('/scrape', function(req, res){

	readFile();

	songs.forEach(function(item){
		url = 'https://www.youtube.com/results?search_query='+item;
		request(url, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);
				$('.yt-lockup.yt-lockup-tile.yt-lockup-video.vve-check.clearfix').each(function(index,item){
					var searchPage =$(this).html();
					$ = cheerio.load(searchPage);
					$('a').each(function (index,item){
						var text = $(this).attr('href')+'\n';
						console.log(text);
						if (text.indexOf('watch') > -1){
							videoUrls.add(defaultUrl+text);
						}
					});
				});
			}
		})
	})
	saveToFile();
})

function readFile(){
	var lineReader = require('readline').createInterface({
		input: require('fs').createReadStream('songs.txt')
	});

	lineReader.on('line', function (line) {
		songs.push(line);
	});
}

app.get('/results', function(req, res){
	var vara ="";
	for (var videos of videoUrls){
		vara+=defaultUrl+videos+"\n";
	}

	fs.writeFile('final.txt',vara,(err)=>{
		if(err)
			console.log("error");

	});


})

function saveToFile(){
	console.log("savin to file");
	for (var se of videoUrls ){
		myVariable+= se;	
	}
	console.log("my variable content");
	myVariable.forEach(x -> console.log(x));
	console.log(".......................");

	fs.unlink('othermessage.txt', (err) => {
		if (err) throw err;
		console.log('successfully deleted otherText');

		fs.writeFile('othermessage.txt',myVariable,(err)=>{
			if(err){
				console.log("error");
			}else{
				console.log("written");
			}

		});
	});

}

console.log('magic starts');
app.listen('8081')
exports = module.exports = app;
