'use strict';

// Server imports
const Hapi = require('hapi');

// Import Utils
const logger = require('./utils/logger');
const security = require('./utils/security');
const bootstrapDB = require('../models/index');

// Server instantiation
const serverConfig = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
};
const server = Hapi.server(serverConfig);


// todo: modulate routes
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

// Start the server
async function start() {
    try {
        //Plugins:
        await security.blankie(server);
        // await security.ralphi(server);

        // Bootstrap DB:
        bootstrapDB();

        // Start Server
        await server.start();
    }
    catch (err) {
        logger.error(err);
        process.exit(1);
    }

    logger.info(`Server running at: ${serverConfig.host}:${serverConfig.port}`);
};

start();