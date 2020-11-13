import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-auth";


var firebaseConfig = {
  apiKey: "AIzaSyCpbQApbFIbO0XOfqxGtO7C2rW9kIywMi8",
  authDomain: "studentquiz3.firebaseapp.com",
  databaseURL: "https://studentquiz3.firebaseio.com",
  projectId: "studentquiz3",
  storageBucket: "studentquiz3.appspot.com",
  messagingSenderId: "555534569325",
  appId: "1:555534569325:web:31a80d6efebac3b6055464",
  measurementId: "G-HVW8XGEJ5G"
  };
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
