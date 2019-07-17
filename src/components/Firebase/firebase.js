import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDjBbWjU4INwPrBhfGSW8PG7uHCIB11Hkw",
    authDomain: "federatedreturnsmanagement.firebaseapp.com",
    databaseURL: "https://federatedreturnsmanagement.firebaseio.com",
    projectId: "federatedreturnsmanagement",
    storageBucket: "federatedreturnsmanagement.appspot.com",
    messagingSenderId: "185371991736",
    appId: "1:185371991736:web:ab21afbbac17b1e7"
  };

  class Firebase {
      constructor() {
          app.initializeApp(firebaseConfig);

          this.auth = app.auth();
      }

      // *** Auth API ***
      doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

      doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

      doSignOut = () => this.auth.signOut();

      doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);

      doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);
  }

  export default Firebase;