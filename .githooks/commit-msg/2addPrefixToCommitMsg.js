#!/usr/bin/env node

const

    // Libraries
    util = require('./../util.js'),
    _ = require('lodash'),
    constants = require('./../const.js'),
    fs = require('fs');

  let branchName;

return util.getBranchName()
  .then((res) => branchName = res)
  .then(() => util.getCommitMessage())
  .then((commitMsg) => {
      // If commitMsg doesn't start with branch prefix, add it
      const isPrefixed = util.isBranchNamePrefixed(_.lowerCase(branchName)),
        isCommitMsgPrefixed = util.isCommitMsgPrefixed(_.lowerCase(commitMsg)),
        branchPrefix = util.getPrefix(branchName);

      // If branch is not prefixed then don't do anything because we don't know what prefix it should be
      // // If commit msg is already prefixed we don't need to add it again
      if (!isPrefixed || isCommitMsgPrefixed) {
          return;
      }

      fs.writeFile('.git/COMMIT_EDITMSG', `${_.upperFirst(branchPrefix)} - ${commitMsg}`, function (err,data) {
          if (err) {
              return console.log(err);
          }
      });
  });
