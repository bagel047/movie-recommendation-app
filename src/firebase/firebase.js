// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAMIFrhi8EWf-zz-cvPS6_YSZ8v9_04Nw",
  authDomain: "movierecommendation-30db0.firebaseapp.com",
  databaseURL:
    "https://movierecommendation-30db0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movierecommendation-30db0",
  storageBucket: "movierecommendation-30db0.appspot.com",
  messagingSenderId: "1098684483683",
  appId: "1:1098684483683:web:f7d3a095aa61369d4b1056",
  measurementId: "G-F96P6VGT18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
