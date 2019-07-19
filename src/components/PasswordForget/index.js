// import react
import React, { Component } from 'react';

//import the link and withRouter functions from react router
import { Link, withRouter } from 'react-router-dom';

//import all the routes
import * as ROUTES from '../../constants/routes';

//import the withFirebase function
import { withFirebase } from '../Firebase';

//import the button component from material ui
import Button from '@material-ui/core/Button';

// define the PasswordForgetPage component
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>

    {/* inject the PasswordForgetForm */}
    <PasswordForgetForm />
  </div>
);

// define "INITIAL_STATE"
const INITIAL_STATE = {
  email: '',
  error: null,
};

//define the PasswordForgetFormBase class
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    // set its state to == "INITIAL_STATE"
    this.state = {...INITIAL_STATE};
  }

  // define an onSubmit event
  onSubmit = event => {

    //cons email == email from this.state
    const { email } = this.state;

    //access Firebase from props
    this.props.firebase

    //call doPasswordReset from Firebase, pass in the email variable
    .doPasswordReset(email)
    .then(() => {
      // then reset the state back to "INITIAL_STATE"
      this.setState({ ...INITIAL_STATE});
    })
    // if there is an error, set this.state's error attribute == to the error
    .catch(error => {
      this.setState({ error });
    });

    //prevent the page from reloading on completion
    event.preventDefault();
  };

  //define an onChange event
  onChange = event => {

    //set this.state to the key: value pairs passed to the function
    this.setState({ [event.target.name]: event.target.value});
  };

  // define the render method
  render() {

    // set const's email and error to == their equivalents from this.state
    const { email, error } = this.state;

    //define isInvalid, is true if email is empty
    const isInvalid = email === '';

    return (

      //when the form is submitted, call the onSubmit function
      <form onSubmit={this.onSubmit}>

        {/* input with a name of email, value is pulled from this.state.email, calls the onChange method each time it's changed */}
        <input 
          name="email" 
          value={this.state.email} 
          onChange={this.onChange} 
          type="text" 
          placeholder="Email Address" 
          />

        {/* inject a button that submits the form, has a disabled attribute which == the output of isInvalid */}
        <Button variant="contained" disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        {/* if error = true, render the error message */}
        {error && <p>{error.message}</p>}

      </form>
    );

  }

}

//define the PasswordForgetLink component
const PasswordForgetLink = () => (
  <p>
    {/* links to the route for PASSWORD_FORGET */}
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
  </p>
);

//export PasswordForgetPage component (defined at the top)
export default PasswordForgetPage;

// define PasswordForgetForm component. Created by passing PasswordForgetFormBase in to the withFirebase function
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

//export the PasswordForgetForm and PasswordForgetLink components
export { PasswordForgetForm, PasswordForgetLink };