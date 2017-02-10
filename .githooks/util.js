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
        return !_.isNil(this.getBranchNamePrefix(branchName));
    },

    getBranchNamePrefix: function(branchName) {
        const prefix = _(constants.BRANCH_PREFIXES)
            .find((prefix) => {
                return _.startsWith(branchName, prefix)
            })

        return prefix;
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
