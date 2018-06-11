var request = require('request');
var secret = require('./secrets');
console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
     
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
         },
	'auth':{ 'bearer': secret.GITHUB_TOKEN}

  };
/*
  //var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  //request(url, cb); /*function(err, res, body) {
    cb(err, body); 
    

  }); */
  
  request(options, cb); 
  //request(options, function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
}

var obj = "";
getRepoContributors("jquery","jquery",function(err, res, body){
	//obj += body ;
	var data = JSON.parse(body);
	console.log(data);
	console.log(data.length);

	for(var i = 0; i < data.length; i++){
		console.log(data[i]["avatar_url"]);
	}
});

//Obtain kirvani image

var fs = require('fs');

function downloadImageByURL(url, filePath) {
	request.get(url)
		.on("error", function(err){throw err;})
		.on("response", function(res){ console.log("res status", res.statusCode);})
		.pipe(fs.createWriteStream("./"+filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
