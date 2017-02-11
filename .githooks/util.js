const exec = require('child_process').exec,
    fs = require('fs'),
    constants = require('./const.js'),
    _ = require('lodash');

module.exports = {
    bash: function(command) {
        return new Promise((resolve) => {
            exec(command, (error, stdout) => {
                resolve({
                    error: error,
                    output: _.trim(stdout, '\n')
                })
            });

        });
    },

    getBranchName: function() {
        return this.bash('git symbolic-ref -q HEAD')
          .then((result) => {
              branchName = _(result.output)
                .split('/')
                .last()
                .trim(['\n'])

              return branchName;
          })
    },

    isBranchNamePrefixed: function(branchName) {
        return !_.isNil(this.getPrefix(branchName));
    },

    isCommitMsgPrefixed: function(commitMessage) {
        return !_.isNil(this.getPrefix(commitMessage));
    },

    getPrefix: function(string) {
        string = _.lowerCase(string);
        const prefix = _(constants.BRANCH_PREFIXES)
            .find((prefix) => {
                return _.startsWith(string, prefix)
            })

        return prefix;
    },

    writeCommitMessage: function(message) {
      return new Promise((resolve) => {
          fs.writeFile('.git/COMMIT_EDITMSG', message, function (err,data) {
              if (err) {
                  return console.log(err);
              }
              resolve();
          });
      })
    },

    getCommitMessage: function() {
      return new Promise((resolve) => {
          fs.readFile('.git/COMMIT_EDITMSG', 'utf8', function(err, contents) {
             const commitMessage = _(contents)
                .split('\n')
                .head()

              resolve(commitMessage);
          });
      })
    }
}
