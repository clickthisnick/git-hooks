const exec = require('child_process').exec,
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
              refSplit = refHead.split('/');
              return _.last(refSplit);
          })
    }
}
