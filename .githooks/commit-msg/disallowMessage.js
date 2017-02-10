#!/usr/bin/env node

const exec = require('child_process').exec,
    fs = require('fs');

// Checking if any packages are missing
return new Promise((resolve) => {
    fs.readFile('.git/COMMIT_EDITMSG', 'utf8', function(err, contents) {
        console.log(contents);
        resolve(contents);
    });
})
// If packages are missing then run npm install
.then((commitMessage) => {
    console.log(commitMessage);
});
