//import react
import React from 'react';

// import the authorization function
import { withAuthorization } from '../Session';

// define the homepage component
const Homepage = () => (
  <div>
    <h1>Home</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

// define the condition that manages the Authorization function
// in this case, check if authUser exists (or = true)
const condition = authUser => !!authUser;

// export the hompage wrapped in the authorization function, pass in the condition to run the auth check against
export default withAuthorization(condition)(Homepage);