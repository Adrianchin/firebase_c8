import React, { createContext } from 'react';
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDs4ds5-yK2YsZ5iooqp_fspWabUMGPTm8",
  authDomain: "inceptionutest.firebaseapp.com",
  projectId: "inceptionutest",
  storageBucket: "inceptionutest.appspot.com",
  messagingSenderId: "173413718219",
  appId: "1:173413718219:web:69a08e864569b11a9e234e",
  measurementId: "G-4WHBDG4V3S"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const FirebaseContext = createContext();

function FirebaseProvider(props) {
  const children = props.children;
  const theValues = { app, auth, db };
  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;
