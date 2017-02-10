#!/usr/bin/env node

const exec = require('child_process').exec;

// Checking if any packages are missing
return Promise.resolve()
// If packages are missing then run npm install
.then(() => {
    exec('cat "$1"', (error, stdout) => {
        console.log(stdout); // eslint-disable-line no-console
    });
});
