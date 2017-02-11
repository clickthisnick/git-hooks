#!/usr/bin/env node

const util = require('./../util.js'),
    _ = require('lodash');

let commitMsg;

return util.getCommitMessage()
    .then((res) => commitMsg = res)
    .then(() => util.bash('which aspell'))
    .then((aspell) => {
        if (!_.isNil(aspell.error)) {
            console.log('\n');
            console.log('\t\x1b[103m', 'Cannot check commit spelling unless you install aspell' ,'\x1b[0m');
            console.log('\t\x1b[103m', 'To install use command:' ,'\x1b[0m');
            console.log('brew install aspell');
            console.log('\n');
        } else {
            return util.bash(`${aspell.output} list < .git/COMMIT_EDITMSG | sort -u`)
                .then((res) => {
                    console.log(res);
                    if (res.output === '') {
                        console.log('farts');
                    }

                    let ignoredWords = ['bugfix', 'githook'],
                        // Adding s to the words and also ignoring them
                        ignoredWordList = _.concat(ignoredWords, _.map(ignoredWords, (word) => `${word}s`));

                    let misspelledWords = _(res.output)
                        .split('\n')
                        .map((word) => _.lowerCase(word))
                        // Remove words in the ignoredWords list
                        .remove((word) => !_.includes(ignoredWordList, word))
                        .value();

                    if (misspelledWords.length === 0) {
                        return;
                    }

                    console.log('\n');
                    console.log('\t\x1b[103m', 'The following words are possibly misspelled' ,'\x1b[0m');
                    _.forEach(misspelledWords, (word) => console.log(`\t${word}`))
                    console.log('\t\x1b[103m', 'To fix use command:' ,'\x1b[0m');
                    console.log('git commit --amend');
                    console.log('\n');
                })
        }
    })
