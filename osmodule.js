var osm = require("os");
console.log(osm.totalmem()/(1024*1024*1024));
console.log(osm.freemem()/(1024*1024*1024));