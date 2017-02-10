#!/usr/bin/env node

const

    // Libraries
    exec = require('child_process').exec,
    _ = require('lodash'),
    fs = require('fs');

// Checking if any packages are missing
return new Promise((resolve) => {
    fs.readFile('.git/COMMIT_EDITMSG', 'utf8', function(err, commitMessage) {
        resolve(commitMessage);
    });
})
// If packages are missing then run npm install
.then((commitMessage) => {
  
    fs.writeFile('.git/COMMIT_EDITMSG', `abc - ${commitMessage}`, function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
});
