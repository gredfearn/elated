const Blankie = require('blankie');
const Scooter = require('scooter');
const ralphi = require('hapi-ralphi');
const client = require('ralphi-client');

const security = {
    blankie: async (server) => {
        await server.register([Scooter, {
            plugin: Blankie,
            options: {} // specify options here
        }])
        .catch((err) => {
            throw err;
        });
    },
    ralphi: async (server) => {
        await server.register({
            ralphi, 
            options: {
                client
            },
        });
    },

};

module.exports = security;