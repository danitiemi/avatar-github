var request = require('request');
var secret = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    console.log(data);
    cb(err, data);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  for(var element of result) {
    console.log(element.avatar_url);
  }
});