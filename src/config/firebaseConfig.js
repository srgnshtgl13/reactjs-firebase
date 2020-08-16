  import firebase from 'firebase/app';
  /**
   * firestore is the database
   * and also firestore is a NoSql database
   */
  import 'firebase/firestore';
  import 'firebase/auth';   // we will use this when we work with authentication
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "key",
    authDomain: "domain",
    databaseURL: "url",
    projectId: "id",
    storageBucket: "storageBucket",
    messagingSenderId: "13",
    appId: "appId",
    measurementId: "test"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // export firebase
  export default firebase;
