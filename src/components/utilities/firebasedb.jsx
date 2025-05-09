import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8JsoiLOOWfaqMTYrcn9kNtHhVgr2Ikmo",
  authDomain: "parduotuve-ct-ws.firebaseapp.com",
  projectId: "parduotuve-ct-ws",
  storageBucket: "parduotuve-ct-ws.firebasestorage.app",
  messagingSenderId: "131229126062",
  appId: "1:131229126062:web:50ae5a51530594b375cc3f",
  measurementId: "G-G9JSWBHDMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export default db;
