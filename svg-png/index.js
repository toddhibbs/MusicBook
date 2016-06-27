var svg_to_png = require('svg-to-png');

svg_to_png.convert("./svg", "./png", { defaultWidth: '400px' }) // async, returns promise
.then( function(){
    // Do tons of stuff
    console.log('All done!');
});