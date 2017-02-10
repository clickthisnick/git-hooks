const util = require('./../utl.js');

return util.bash('git symbolic-ref -q HEAD')
  .then((output) => console.log(output));
