//import React and Component
import React, { Component } from 'react';

//Import the withRouter funcion
import { withRouter } from 'react-router-dom';

//Import the withFirebase function
import { withFirebase } from '../Firebase';

//import the compose function
import { compose } from 'recompose';

//import the PasswordForgetLink component
import { PasswordForgetLink } from '../PasswordForget';

//import the SignUpLink component
import { SignUpLink} from '../SignUp';

//import all the routes
import * as ROUTES from '../../constants/routes';

//import the button component from material UI
import Button from '@material-ui/core/Button';

//define SignIn component
const SignIn = () => (
  <div>
    <h1>SignIn</h1>

    {/* Inject the SignInForm */}
    <SignInForm />

    {/* Inject the SignUpLink */}
    <SignUpLink />

    {/* Inject the PasswordForgetLink */}
    <PasswordForgetLink />
  </div>
);

//Define the "INITIAL_STATE"
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

//define the SignInFormBase class
class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    // set state to == "INITIAL_STATE"
    this.state = { ...INITIAL_STATE };

  }

  //define an onSubmit function that is passed an event
  onSubmit = (event) => {

    //set email and password to == their equivalent from this.state
    const { email, password } = this.state;

    //access Firebase from this.props
    this.props.firebase

      //call the doSignInWithEmailAndPassword method from Firebase, pass in email and password
      .doSignInWithEmailAndPassword(email, password)

      // then set state back to "INITIAL_STATE"
      // and send the user to the home page by pushing the path in to the router
      .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
      })

      // if there is an error
      .catch(error => {

        // set this.state to match
        this.setState({ error });
      });

      //stop the page from refreshing when done
      event.preventDefault();
  };

  // define an onChange event - is passed an event
  onChange = event => {

    // set's state to equal the output of a set of key: value pairs
    this.setState({ [event.target.name]: event.target.value});
  };

  // define the render function
  render() {

    // set variables to = their equivalents from this.state
    const {
      email,
      password,
      error,
    } = this.state;

    // define isInvalid, == the value of checking if either the password or email are empty
    const isInvalid = 
      password === '' ||
      email === '';

    return (

      // when form is submitted, call the onSubmit function
      <form onSubmit={this.onSubmit}>

        {/* form input, name = email, value = email variable, when input is changed, call the onChange function */}
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          />

        {/* value is = to the password variable, when changed, calls the inChange function */}
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          />

          {/* injects a button to submit the form, has a disabled attribute = to the output of isInvalid */}
          <Button variant="contained" disabled={isInvalid} type="submit">Sign In</Button>

          {/* if an error exists, display it */}
          {error && <p>{error.message}</p>}

      </form>
    );
  }

}

//define the SignInForm component, made up of the SignInFormBase, wrapped inside both withRouter and withFirebase
const SignInForm = compose(withRouter, withFirebase,)(SignInFormBase);

//export the SignIn component
export default SignIn;

//export the SignInForm component
export { SignInForm };