var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Set = require("collections/set");
var app     = express();
var videoUrls = new Set();
var defaultUrl = "https://www.youtube.com";
var myVariable ="";

app.get('/scrape', function(req, res){

	//url = 'http://www.imdb.com/title/tt1229340/';
	//url = 'http://www.fabio.com.ar';
	url = 'https://www.youtube.com/results?search_query=polkageist';

	//	yt-simple-endpoint style-scope ytd-video-renderer

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			//$('.vve-check').filter(function(index,item){
			//yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link
			$('.yt-lockup.yt-lockup-tile.yt-lockup-video.vve-check.clearfix').each(function(index,item){
				var searchPage =$(this).html();
				$ = cheerio.load(searchPage);
				$('a').each(function (index,item){
					var text = $(this).attr('href')+'\n';
					if (text.indexOf('watch') > -1){
						videoUrls.add(text);
					}
				});
			});
			saveToFile();
		}
	})
})


function saveToFile(){
	for (var se of videoUrls ){
		myVariable+= se;	
	}
	fs.unlink('othermessage.txt', (err) => {
		if (err) throw err;
		console.log('successfully deleted /tmp/hello');

		fs.writeFile('othermessage.txt',myVariable,(err)=>{
			if(err){
				console.log("error");
			}else{
				console.log("written");
				videoUrls.clear();
				myVariable = "";
			}

		});
	});

}

console.log('magic starts');
app.listen('8081')
exports = module.exports = app;
