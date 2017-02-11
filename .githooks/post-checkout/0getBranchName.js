#!/usr/bin/env node

const util = require('./../util.js'),
  _ = require('lodash'),
  constants = require('./../const.js'),
  ignoreBranches = ['master', 'latest'];

return util.getBranchName()
  .then((branchName) => {
      const isPrefixed = util.isBranchNamePrefixed(branchName);

      // Don't give error for branches we don't want to be warned on
      if (_.includes(ignoreBranches, branchName)) {
          return;
      }

      if (!isPrefixed) {
          console.log('\n\n');
          console.log('\t\x1b[103m', 'Branch name missing required prefix' ,'\x1b[0m');
          console.log('\t\x1b[103m', 'Rename branch with one of the following commands:' ,'\x1b[0m');
          _.forEach(constants.BRANCH_PREFIXES, (prefix) => {
                console.log(`\tgit branch -m ${branchName} ${prefix}-${branchName}`)
          })
          console.log('\n\n');

      }
  });
