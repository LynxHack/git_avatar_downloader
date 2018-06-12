var Args = process.argv;
var request = require('request');
var secret = require('./secrets');
var docpath = "avatarsfromgit/";
console.log(__dirname);


//Check if folder given exists
var fs = require('fs');
console.log(__dirname + "/" + docpath);
if(!fs.existsSync(__dirname + "/" + docpath)){throw new Error('Save folder not found');}
if(!fs.existsSync(__dirname + "/.env")){throw new Error('Missing .env file!');}


//Obtain .env credential information
const dotenv = require('dotenv').config();
if(dotenv.error){ throw result.error; }


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
  try{
  request(options, cb); 
  }
  catch{ "Error reading off of the url, potential missing/incorrect credentials"}
}

var obj = "";
getRepoContributors(Args[2],Args[3],function(err, res, body){
  var data = JSON.parse(body);
  console.log(data);
  console.log(data.length);

  for(var i = 0; i < data.length; i++){
    if (data[i]["avatar_url"]["message"] == 'Not Found')
	throw new Error('Could not locate the repository!');
    downloadImageByURL(data[i]["avatar_url"], docpath + data[i]["login"]);
    getHighestStarredRepo(data[i]["login"]);
    console.log(data[i]["login"]);
    getHighestStarredRepo(data[i]["login"]);
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


//Get highest starred repos
var response = [];
function getHighestStarredRepo(login) {
   var options = {
    url: "https://api.github.com/" + login + "/starred_url",
    headers: {
      'User-Agent': 'request' 
     },
    'auth':{ 'bearer': process.env.TOKEN} //secret.GITHUB_TOKEN}

  };

  request(options, function(err, res, body){
    var data = JSON.parse(body);
    console.log(data);
    console.log(data.length);

    for(var i = 0; i < data.length; i++){
      console.log(data[i]);
    }
  }); 
}



