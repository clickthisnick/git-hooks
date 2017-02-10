#!/usr/bin/env node

const

    // Libraries
    exec = require('child_process').exec,
    _ = require('lodash'),
    fs = require('fs'),

    minimumWordCount = 3;

// Checking if any packages are missing
return new Promise((resolve) => {
    fs.readFile('.git/COMMIT_EDITMSG', 'utf8', function(err, contents) {
        const commitMessage = _.trim(contents, ['\n']);

        resolve(commitMessage);
    });
})
// If packages are missing then run npm install
.then((commitMessage) => {
    const wordCount = commitMessage.split(' ').length;
    let errorString = [];

    if (wordCount < minimumWordCount) {
        errorString.push(`Commit Message: "${commitMessage}" Not Descriptive. Please use at least ${minimumWordCount} words`);
    }

    if (errorString.length > 0) {
        // http://misc.flogisoft.com/bash/tip_colors_and_formatting
        console.log('\x1b[103m', _.join(errorString, '\n') ,'\x1b[0m');
        console.log('\x1b[31m', 'Aborting Commit.' ,'\x1b[0m');
        process.exit(1);
    }
});
