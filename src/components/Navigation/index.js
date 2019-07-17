import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';





const Navigation = () => (

  <List component="nav">
    <ListItem component="div">
      <ListItemText inset>
        <Button variant="contained" component={Link} to="/SIGN_IN">
          Sign In
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/LANDING">
          Landing
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/HOME">
          Home
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/ACCOUNT">
          Account
        </Button>
      </ListItemText>

      <ListItemText inset>
        <Button variant="contained" component={Link} to="/ADMIN">
          ADMIN
        </Button>
      </ListItemText>

    </ListItem>
  </List>

);

export default Navigation;