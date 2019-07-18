import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
    .doPasswordUpdate(passwordOne)
    .then(() => {
      this.setState({ ...INITIAL_STATE});
    })
    .catch(error => {
      this.setState({ error });
    });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = 
      passwordOne === '' ||
      passwordTwo === '' ||
      passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.onSubmit}>

        <input 
          name="New Password" 
          value={this.state.passwordOne} 
          onChange={this.onChange} 
          type="text" 
          placeholder="New Password" 
          />

        <input 
          name="Confirm New Password" 
          value={this.state.passwordTwo} 
          onChange={this.onChange} 
          type="text" 
          placeholder="Confirm New Password" 
          />

        <Button variant="contained" disabled={isInvalid} type="submit">
          Change My Password
        </Button>

        {error && <p>{error.message}</p>}

      </form>
    );

  }

}

export default withFirebase(PasswordChangeForm);