// import the app component from firebase/app
import app from 'firebase/app';

//import the firebase/auth API
import 'firebase/auth';

//import firebase DB API
import 'firebase/database';

//define the firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyDjBbWjU4INwPrBhfGSW8PG7uHCIB11Hkw",
    authDomain: "federatedreturnsmanagement.firebaseapp.com",
    databaseURL: "https://federatedreturnsmanagement.firebaseio.com",
    projectId: "federatedreturnsmanagement",
    storageBucket: "federatedreturnsmanagement.appspot.com",
    messagingSenderId: "185371991736",
    appId: "1:185371991736:web:ab21afbbac17b1e7"
  };

  // define the firebase class
  class Firebase {
      constructor() {
          //constructor initialises an instance of App and passes in firebaseconfig
          app.initializeApp(firebaseConfig);

          //set this.auth == app.auth
          this.auth = app.auth();

          //set this.db == app.database
          this.db = app.database();
      }

      // *** Auth API ***

      //define method to create user with email and password
      doCreateUserWithEmailAndPassword = (email, password) => 
       
      //call the create user method from firebase, pass in an email and password
        this.auth.createUserWithEmailAndPassword(email, password);

      //define method to sign in with email and password
      doSignInWithEmailAndPassword = (email, password) => 

        //call the sign in method from firebase, pass an email and password
        this.auth.signInWithEmailAndPassword(email, password);

      //define method to sign out by calling the firebase signOut function
      doSignOut = () => this.auth.signOut();

      //define method to reset password
      doPasswordReset = email => 
        //call the firebase function to send password reset, pass in email
        this.auth.sendPasswordResetEmail(email);

      //define method to update password
      doPasswordUpdate = password => 
        //call the firebase method to update the password of the current user, pass in a password
        this.auth.currentUser.updatePassword(password);


      // *** User API ***

      //define user, passes a uid to the DB api and looks up a user with that uid
      //call this with an existing uid to query, or a new uid to create.
      user = uid => this.db.ref( 'users/' + uid );

      // define user, makes a request to the DB api for all users
      users = () => this.db.ref('users');
  }

  //export Firebase
  export default Firebase;