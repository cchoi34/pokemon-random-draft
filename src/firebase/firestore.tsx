import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBrE8R_wzz-Ynf9arqaeoBrfpTDukNKD0g',
  authDomain: 'pokemon-random-draft.firebaseapp.com',
  databaseURL: 'https://pokemon-random-draft-default-rtdb.firebaseio.com',
  projectId: 'pokemon-random-draft',
  storageBucket: 'pokemon-random-draft.appspot.com',
  messagingSenderId: '124824553555',
  appId: '1:124824553555:web:49258b2d3cba0960b8dea6',
  measurementId: 'G-LP1RFKVWRP',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;