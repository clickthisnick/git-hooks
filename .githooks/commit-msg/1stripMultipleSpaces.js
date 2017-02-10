#!/usr/bin/env node

const

    // Libraries
    util = require('./../util.js'),
    _ = require('lodash'),
    fs = require('fs');

return util.getCommitMessage()
  .then((commitMsg) => {
      // Remove multiple spaces and spaces surrounding message
      const sanitizedCommitMsg = _(commitMsg)
          .replace(/  +/g, ' ')
          .trim();

      fs.writeFile('.git/COMMIT_EDITMSG', `${sanitizedCommitMsg}`, function (err,data) {
          if (err) {
              return console.log(err);
          }
      });
  });
