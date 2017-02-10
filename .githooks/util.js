const exec = require('child_process').exec,
    fs = require('fs'),
    constants = require('./const.js'),
    _ = require('lodash');

module.exports = {
    bash: function(command) {
        return new Promise((resolve) => {
            exec(command, (error, stdout) => {
                if (error) {
                    console.log(`Error: ${error}`);
                }
                resolve(stdout);
            });

        });
    },

    getBranchName: function() {
        return this.bash('git symbolic-ref -q HEAD')
          .then((refHead) => {
              branchName = _(refHead)
                .split('/')
                .last()
                .trim(['\n'])

              return branchName;
          })
    },

    isBranchNamePrefixed: function(branchName) {
        const isPrefixed = _(constants.BRANCH_PREFIXES)
            .find((prefix) => {
                _.startsWith(branchName, prefix)
            })
            .isNil()

        return isPrefixed;
    },

    getBranchNamePrefix: function(branchName) {
        let branchPrefix;

        // If branch is not prefixed return null
        if (!isBranchNamePrefixed(branchName)) {
            return null;
        }

        branchPrefix = _.find(constants.BRANCH_PREFIXES, (prefix) => {
            return _.startsWith(branchName, prefix)
        })

        return branchPrefix;
    },

    getCommitMessage: function() {
      return new Promise((resolve) => {
          fs.readFile('.git/COMMIT_EDITMSG', 'utf8', function(err, contents) {
              const commitMessage = _.trim(contents, ['\n']);

              resolve(commitMessage);
          });
      })
    }
}
