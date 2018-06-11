var request = require('request');
var secret = require('./secrets');
console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
   
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
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


var obj;
getRepoContributors("jquery","jquery",function(err, res, body){
	console.log(JSON.parse(body));
	obj = JSON.parse(body);
});


console.log(obj);
///Secure avatar urls
for(element in obj){
	console.log(element);
	console.log(element[avatar_url]);
}
