var Args = process.argv;
var request = require('request');
var secret = require('./secrets');
require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');

if(Args.length !== Number(4)){
  throw new Error('Need to input both repo owner and repo name as arguments!');
}


function getRepoContributors(repoOwner, repoName, cb) {  
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    },
    'auth':{ 'bearer': process.env.TOKEN} //secret.GITHUB_TOKEN}

  };

  request(options, cb); 
}

var obj = "";
getRepoContributors(Args[2],Args[3],function(err, res, body){
  var data = JSON.parse(body);
  console.log(data);
  console.log(data.length);

  for(var i = 0; i < data.length; i++){
    downloadImageByURL(data[i]["avatar_url"], "avatarsfromgit/" + data[i]["login"]);
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



