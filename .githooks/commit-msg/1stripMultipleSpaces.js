#!/usr/bin/env node

const

    // Libraries
    _ = require('lodash'),
    fs = require('fs');

// Getting the commit message
return new Promise((resolve) => {
    fs.readFile('.git/COMMIT_EDITMSG', 'utf8', function(err, commitMessage) {
        resolve(commitMessage);
    });
})
.then((commitMessage) => {
    // Remove multiple spaces
    commitMessage = commitMessage.replace(/  +/g, ' ');
    fs.writeFile('.git/COMMIT_EDITMSG', `${commitMessage}`, function (err,data) {
        if (err) {
            return console.log(err);
        }
    });
});
