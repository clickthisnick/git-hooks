#!/usr/bin/env node

const

    // Libraries
    util = require('./../util.js'),
    _ = require('lodash'),
    constants = require('./../const.js'),
    fs = require('fs'),

    // Constant Variables
    branchName;

return util.getBranchName()
  .then((res) => branchName = res)
  .then(() => util.getCommitMessage())
  .then((commitMsg) => {
      // If commitMsg doesn't start with branch prefix, add it
      const isPrefixed = isBranchNamePrefixed(branchName);

      // If branch is not prefixed then don't do anything because we don't know what prefix it should be
      if (!isPrefixed) {
          return
      }

      fs.writeFile('.git/COMMIT_EDITMSG', `${sanitizedCommitMsg}`, function (err,data) {
          if (err) {
              return console.log(err);
          }
      });
  });
