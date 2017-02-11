#!/usr/bin/env node

const

    // Libraries
    util = require('./../util.js'),
    _ = require('lodash'),

    // The amount of words needed including the prefix
    minimumWordCount = 5,

    // Word count for the preappended prefix to every commit message
    prefixWords = 2;

return util.getCommitMessage()
    .then((commitMessage) => {
        const wordCount = commitMessage.split(' ').length;
        let errorString = [];

        if (wordCount < minimumWordCount) {
            errorString.push(`Commit Message: "${commitMessage}" Not Descriptive. Please use at least ${minimumWordCount - prefixWords} words after prefix`);
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
