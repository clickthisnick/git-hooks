#!/usr/bin/env node

const

    // Libraries
    util = require('./../util.js'),
    _ = require('lodash'),

    minimumWordCount = 3;

return util.getCommitMessage()
    .then((commitMessage) => {
        const wordCount = commitMessage.split(' ').length;
        let errorString = [];

        if (wordCount < minimumWordCount) {
            errorString.push(`Commit Message: "${commitMessage}" Not Descriptive. Please use at least ${minimumWordCount} words`);
        }

        if (errorString.length > 0) {
            // http://misc.flogisoft.com/bash/tip_colors_and_formatting
            console.log('\n\n');
            console.log('\t\x1b[103m', _.join(errorString, '\n') ,'\x1b[0m');
            console.log('\t\x1b[31m', 'Aborting Commit.' ,'\x1b[0m');
            console.log('\n\n');
            process.exit(1);
        }
    });
