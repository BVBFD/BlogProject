import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  projectId: process.env.REACT_APP_projectId,
};

export const firebaseApp = initializeApp(firebaseConfig);
