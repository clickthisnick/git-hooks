#!/usr/bin/env node

const util = require('./../util.js'),
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
        branchPrefix = _.upperFirst(util.getPrefix(branchName));

    // If branch is not prefixed don't add any prefix since we don't know what it would be
    if (!isBranchPrefixed) {

        // Make sure the commit message starts with a capital letter
        if (commitMsg !== _.upperFirst(commitMsg)) {
            return util.writeCommitMessage(_.upperFirst(commitMsg));
        }
    }

    // Prepend branch prefix to commit and make sure the commitMsg starts with a capital letter git
    if (!_.startsWith(commitMsg, branchPrefix)) {
        return util.writeCommitMessage(`${branchPrefix} - ${_.upperFirst(commitMsg)}`);
    }
  });
