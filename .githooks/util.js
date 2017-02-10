exec = require('child_process').exec;

module.exports = {
    bash: function(command) {
        return new Promise((resolve) => {
            exec('npm install', (error, stdout) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    return '';
                }
                return stdout;
            });

        });
    },
}
