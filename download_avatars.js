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


