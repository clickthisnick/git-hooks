#!/usr/bin/env node

const exec = require('child_process').exec,
    _ = require('lodash'),
    fs = require('fs');

// Checking if any packages are missing
return new Promise((resolve) => {
    fs.readFile('.git/COMMIT_EDITMSG', 'utf8', function(err, contents) {
        const commitMessage = _.trim(contents, ['\n']);

        resolve(commitMessage);
    });
})
// If packages are missing then run npm install
.then((commitMessage) => {
    console.log(_.includes(['foo'], commitMessage));
    if (_.includes(['foo'], commitMessage)) {
        exec('exit 1', (error, stdout) => {
            console.log(error);
            console.log(stdout); // eslint-disable-line no-console
        });
    }
});
