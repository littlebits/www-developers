'use strict';
var hapi = require('hapi');
var conf = require('./conf');



var server = hapi.createServer(conf.port, conf.server);



module.exports = server;