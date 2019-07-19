// import react
import React from 'react';

// button component from material UI
import Button from '@material-ui/core/Button';

// import the Firebase function
import { withFirebase } from '../Firebase';

// define the Sign Up button and pass in the Firebase class
// This class is gained by wrapping the component in the Firebase function when it's exported
const SignOutButton = ({ firebase }) => (

  // Define the button. Create an onClick event that calls the Firebase class's doSignOut method
  <Button variant="contained" onClick={firebase.doSignOut}>
    Sign Out
  </Button>

);

// export the Button wrapped in the Firebase function
export default withFirebase(SignOutButton);