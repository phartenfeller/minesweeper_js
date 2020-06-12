import Dexie from 'dexie';

const db = new Dexie('statsDB');
db.version(1).stores({
  games: '++id, *mode, *result, time, date'
});

const getDb = () => {
  return db;
};

export default getDb;
