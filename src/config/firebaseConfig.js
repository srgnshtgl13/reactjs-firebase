  import firebase from 'firebase/app';
  /**
   * firestore is the database
   * and also firestore is a NoSql database
   */
  import 'firebase/firestore';
  import 'firebase/auth';   // we will use this when we work with authentication
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBbpkXOj0aQBa0BCEXSYH6Hdo7AA7GzzKc",
    authDomain: "reactjs-marioplan-1dd37.firebaseapp.com",
    databaseURL: "https://reactjs-marioplan-1dd37.firebaseio.com",
    projectId: "reactjs-marioplan-1dd37",
    storageBucket: "reactjs-marioplan-1dd37.appspot.com",
    messagingSenderId: "36925619442",
    appId: "1:36925619442:web:876cf3084b2ad69e33a46b",
    measurementId: "G-YTX8GS22YT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // export firebase
  export default firebase;
