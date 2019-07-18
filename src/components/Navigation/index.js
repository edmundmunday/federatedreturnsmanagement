import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation =() => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => 
        authUser ? 
        <NavigationAuth /> : 
        <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
  </div>
)


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

      <ListItemText inset>
        <SignOutButton />
      </ListItemText>

    </ListItem>
  </List>

);

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