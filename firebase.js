import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC6PUnOtPHraj2BJ3rBbpCciiy-J1ubRHc",
    authDomain: "scheduler-9c336.firebaseapp.com",
    databaseURL: "https://scheduler-9c336-default-rtdb.firebaseio.com",
    projectId: "scheduler-9c336",
    storageBucket: "scheduler-9c336.appspot.com",
    messagingSenderId: "85740529463",
    appId: "1:85740529463:web:3c5f0e33f1a497ce65dcb2",
    measurementId: "G-87PJYY6ZTL"
};

firebase.initializeApp(firebaseConfig);

export { firebase };