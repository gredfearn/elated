const fs =  require('fs');
const path =  require('path');
const Sequelize =  require('sequelize');
const cls =  require('continuation-local-storage');
const Umzug =  require('umzug');

// utils
const logger = require('../server/utils/logger');


// set namespace
const namespace = cls.createNamespace('db-transactions');
Sequelize.useCLS(namespace);

// init Sequelize
const Op = Sequelize.Op;
const sequelize = new Sequelize(process.env.DATABASE_URL, { operatorsAliases: Op });
sequelize.options.define.underscored = true;
sequelize.options.logging = msg => logger.debug(msg);
sequelize.options.freezeTableName = true;

// Setup migrations and seeders
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize,
    modelName: 'sequelize_meta',
  },
  migrations: {
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor,
      () => {
        throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
      },
    ],
    path: './seeders',
    pattern: /\.js$/,
  },
});

// Setup DB object
const db = {};
const basename = 'index.js';
const directory = './models/';
const modelsDirectory = path.resolve(directory);
fs.readdirSync(modelsDirectory)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(modelsDirectory, file));
    db[model.name] = model;
  });

// Associate Models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Auth, sync, and migrate db
function bootstrapDB() {
  return sequelize.authenticate()
    .then(() => {
      logger.info('Connected to database successfully.');

      if (process.env.BOOTSTRAP_DB === 'true') {
        logger.info('Bootstrapping the database...');
        return sequelize.sync()
          .then(() => {
            if (process.env.NODE_ENV !== 'test') {
              return umzug.up();
            }
            return null;
          })
          .then(() => {
            logger.info('Ran migrations successfully!');
            logger.info('Bootstrapped the database successfully!');
          })
          .catch((err) => {
            logger.error(`Bootstrapping the database failed: ${err}`);
          });
      }

      return 0;
    })
    .catch(() => {
      logger.error("Stopping the application because we're unable to connect to the database.");
      process.exit();
    });
}

module.exports = bootstrapDB;
