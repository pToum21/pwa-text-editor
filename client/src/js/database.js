import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to accept some content and add it to the database
export const putDb = async (content) => {
  console.log('Add to database');
  // create connection
  const jatedb = await openDB('jate', 1);
  // creates transaction
  const tx = jatedb.transaction('jate', 'readwrite');
  // stores the object
  const store = tx.objectStore('jate');
  // handles the request
  const request = store.add({ jate: content });
  // awaits the result
  const result = await request;

  // checks result
  if (result) {
    console.log('Data saved to the database', result);
  } else {
    console.error('putDb not implemented')
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented')
};

initdb();
