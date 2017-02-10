#!/usr/bin/env node

const

    // Libraries
    util = require('./../util.js'),
    _ = require('lodash'),
    fs = require('fs');

return util.getCommitMessage()
  .then((commitMessage) => {
      // Remove multiple spaces
      commitMessage = commitMessage.replace(/  +/g, ' ');
      fs.writeFile('.git/COMMIT_EDITMSG', `${commitMessage}`, function (err,data) {
          if (err) {
              return console.log(err);
          }
      });
  });
