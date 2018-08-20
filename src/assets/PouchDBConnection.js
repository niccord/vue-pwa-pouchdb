const configuration = require('../../config');
const PouchDB = require('pouchdb').default;

const localdb = new PouchDB(configuration.build.dbName);
const remotedb = new PouchDB(configuration.build.remoteDBName);

PouchDB.sync(localdb, remotedb, {
  live: true,
  retry: true,
});

export default localdb;
