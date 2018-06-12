var request = require('request');
var secret = require('./secrets');
var fs = require('fs');
var owner = process.argv.slice(2, 3);
var repo = process.argv.slice(3);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };

  if (!owner.length || !repo.length) {
    console.log('Something went wrong. Please, try again.');
    return;
  }

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);
  });
}

function contributorInfo (err, result) {
  var file = 'avatars/';
  if (err) {
    console.log("Errors:", err);
  }
  for(var element of result) {
    let filePathUser = file + element.login + ".jpg"
    downloadImageByURL(element.avatar_url, filePathUser);
  }
};

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
        console.log('Photo saved!')
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, contributorInfo);