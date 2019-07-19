// import React
import React from 'react';

// import the Link component from React Router
import { Link } from 'react-router-dom';

// import material UI components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

// import my SignOutButton component
import SignOutButton from '../SignOut';

// import the authUser Context from session
import { AuthUserContext } from '../Session';

// define the Navigation component
const Navigation =() => (

  // wrap it in a div
  <div>

    {/* initiate the AuthContext helper, pass in the authUser,
    if authUser exists, render Authed Navigation, if authUser doesn't exist, render un authed nav */}
    <AuthUserContext.Consumer>
      {authUser => 
        authUser ? 
        <NavigationAuth /> : 
        <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
  </div>
)

// define Authed Nav component
// each button inherets from the React Router 'Link' compoonent and passes in a path
const NavigationAuth = () => (

  <List component="nav">
    <ListItem component="div">
      <ListItemText inset>
        <Button variant="contained" component={Link} to="/">
          Landing
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/home">
          Home
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/account">
          Account
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/admin">
          ADMIN
        </Button>
      </ListItemText>

      {/* the final list item injects the SignOutButton component */}
      <ListItemText inset>
        <SignOutButton />
      </ListItemText>

    </ListItem>
  </List>

);


// define the Non Authed Navigation component
const NavigationNonAuth = () => (

  <List component="nav">
    <ListItem component="div">

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/">
          Landing
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/signin">
          Sign In
        </Button>
      </ListItemText>

    </ListItem>
  </List>

);

export default Navigation;