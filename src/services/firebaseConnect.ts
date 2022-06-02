import firebase from "firebase/app";
import 'firebase/firestore'

let firebaseConfig = {
  apiKey: "AIzaSyC9Un53mTtdVPV6MrbbqufslWMN0dAXOuw",
  authDomain: "boarapp-1d703.firebaseapp.com",
  projectId: "boarapp-1d703",
  storageBucket: "boarapp-1d703.appspot.com",
  messagingSenderId: "1043922799561",
  appId: "1:1043922799561:web:2361abb917ff2c73cbf618",
  measurementId: "G-WRWL780WFP"
};

// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;