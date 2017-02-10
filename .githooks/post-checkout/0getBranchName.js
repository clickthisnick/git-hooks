#!/usr/bin/env node

const util = require('./../util.js'),
  _ = require('lodash'),
  requiredBranchPrefixs = ['chore ', 'hotfix ', 'bugfix '];

return util.getBranchName()
  .then((branchName) => {
      let isPrefixed = false;

      // Figure out if branch is prefixed
      _.forEach(requiredBranchPrefixs, (prefix) => {
          if (_.startsWith(branchName, prefix)) {
            isPrefixed = true;
          }
      })

      if (!isPrefixed) {
          console.log('EPIC FAIL');
      }
  });
