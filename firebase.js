import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCH95Xf0QMNPjHw3AwdQRoNUYqiuILTkj8",
  authDomain: "dispecerat-dev.firebaseapp.com",
  projectId: "dispecerat-dev",
  storageBucket: "dispecerat-dev.appspot.com",
  messagingSenderId: "788936370689",
  appId: "1:788936370689:web:53966ca8d8ab96dd3eee00",
  databaseURL:
    "https://dispecerat-dev-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const db = getDatabase(app);

export { projectFirestore, db };
