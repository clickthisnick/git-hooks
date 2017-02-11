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

    // Commit message should be branch "Prefix - commitMessage"
    const isBranchPrefixed = util.isBranchNamePrefixed(branchName),
        branchPrefix = util.getPrefix(branchName);

    // If branch is not prefixed then don't do anything because we don't know what prefix it should be
    if (!isBranchPrefixed) {
        return;
    }

    // Prepend branch prefix to commit
    return util.writeCommitMessage(`${_.upperFirst(branchPrefix)} - ${commitMsg}`);
  });
