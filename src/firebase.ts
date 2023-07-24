// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE58bBudS_FWE0Ig8qD3JXClZREpidSXY",
  authDomain: "book-catalog-9d736.firebaseapp.com",
  projectId: "book-catalog-9d736",
  storageBucket: "book-catalog-9d736.appspot.com",
  messagingSenderId: "205101136757",
  appId: "1:205101136757:web:4acb7f748ccbbcc3b1313c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
