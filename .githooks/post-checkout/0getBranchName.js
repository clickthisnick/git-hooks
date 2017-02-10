#!/usr/bin/env node

const util = require('./../util.js');

return util.bash('git symbolic-ref -q HEAD')
  .then((output) => {
    console.log('hi');
    console.log(output);
    console.log('hi');
  });
