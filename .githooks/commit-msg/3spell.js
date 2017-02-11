#!/usr/bin/env node

const

    // Libraries
    util = require('./../util.js'),
    _ = require('lodash');

let commitMsg;

return util.getCommitMessage()
    .then((res) => commitMsg = res)
    .then(() => util.bash('pwd'))
    .then((resp) => console.log(resp))
    .then(() => util.bash('which aspell'))
    .then((aspell) => {
        if (!_.isNil(aspell.error)) {
            console.log('\n');
            console.log('\t\x1b[103m', 'Cannot check commit spelling unless you install aspell' ,'\x1b[0m');
            console.log('\tTo install use command: brew install aspell');
            console.log('\n');
        } else {
            console.log(aspell.output)
            return util.bash(`${aspell.output} list < .git/COMMIT_EDITMSG | sort -u`)
                .then((misspelledWords) => {
                    console.log(misspelledWords);
                })
        }
    })
// // ASPELL=$(which aspell)
// if [ $? -ne 0 ]; then
//     echo "Aspell not installed - unable to check spelling" >&2
//     exit
// else
//     # Words found that are thought to be mistakes
//     misspelled_words=$($ASPELL --mode=email --add-email-quote='#' list < "$1" | sort -u)
//     echo ${misspelled_words}
//
//     # Words that we don't want to alert user are mistakes
//     ignored_words=()
//
//     tps=" ${misspelled_words[*]} "                     # stringify the array
//     echo ${tps}
//     for item in ${ignored_words[@]}; do
//       tps=${tps/ ${item} / }                # replace item
//     done
//     misspelled_words=( $tps )                          # replace the array
// fi
//
// if [ -n "$misspelled_words" ]; then
//     printf "\e[1;33m  Possible spelling errors found in commit message:\n\e[0m\e[0;31m%s\n\e[0m\e[1;33m  Use git commit --amend to change the message.\e[0m\n\n" "$misspelled_words" >&2
// fi
