
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_apiKey,
// 	authDomain: process.env.REACT_APP_authDomain,
// 	projectId: process.env.REACT_APP_projectId,
// 	storageBucket: process.env.REACT_APP_storageBucket,
// 	messagingSenderId: process.env.REACT_APP_messagingSenderId,
// 	appId: process.env.REACT_APP_appId,
// };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS_g3R1F1f1mheUrcq3LQhXQcQmKlXTJE",
  authDomain: "social-media-10099.firebaseapp.com",
  projectId: "social-media-10099",
  storageBucket: "social-media-10099.appspot.com",
  messagingSenderId: "868300794526",
  appId: "1:868300794526:web:643d92c839cb3251c0698f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
