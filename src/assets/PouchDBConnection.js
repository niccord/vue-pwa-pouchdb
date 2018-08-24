const configuration = require('../../config');
const PouchDB = require('pouchdb').default;

const localdb = new PouchDB(configuration.build.dbName);

localdb.setRemoteDBName = function srn(remoteDBName) {
  return new Promise((resolve, reject) => {
    try {
      const remotedb = new PouchDB(remoteDBName);

      const sync = PouchDB.sync(localdb, remotedb, {
        live: true,
        retry: true,
      });

      sync.on('complete', () => resolve());
      sync.on('denied', () => reject());
      sync.on('error', () => reject());
    } catch (err) {
      console.error(err);
      return reject();
    }
  });
};

export default localdb;
