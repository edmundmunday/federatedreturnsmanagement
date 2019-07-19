// import react
import React, { Component } from 'react';

//import the link component and withRouter function from react router
import { Link, withRouter } from 'react-router-dom';

//import the compose function
import { compose } from 'recompose';

//import the withFirebase function
import { withFirebase } from '../Firebase';

//import all routes
import * as ROUTES from '../../constants/routes';

//import material UI button component
import Button from '@material-ui/core/Button';

//define SignUpPage
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>

    {/* inject SignUpForm */}
    <SignUpForm />
  </div>
);

//set INITIAL_STATE
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

//define class SignUpFormBase
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    //set state == INITIAL_STATE
    this.state = { ...INITIAL_STATE };

  };

  //define an onSubmit function and pass it an event
  onSubmit = (event) => {

    //username, email, passwordOne = their corresponding values from this.state
    const { username, email, passwordOne } = this.state;

    //access Firebase from props
    this.props.firebase
      //call the method to create a new user and pass email and passwordOne
      .doCreateUserWithEmailAndPassword(email, passwordOne)

      //then create a user record in our DB based on the user details
      .then(authUser => {

        //access this.props.firebase
        this.props.firebase

          //then creates a record of user with an id = to authUser's uid
          .user(authUser.user.uid)

          //then sets values == to username and email
          .set({ username, email})

          //then set the state to INITIAL_STATE and push the home path in to the router
          .then(() => {
              this.setState({ ...INITIAL_STATE });
              this.props.history.push(ROUTES.HOME);
          })

          // if there is an error
          .catch(error => {

            // set state to match
            this.setState({ error });
          });
        })

        .catch(error => { 
          this.setState({ error });
          }
        )

      //prevent the page from refreshing when done
      event.preventDefault();
  };

  //define an onChange event
  onChange = event => {

    // set state to match key: value pairs passed in
    this.setState({ [event.target.name]: event.target.value});
  };

  // define the render component
  render() {

    //set const variables matching this.state
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    //define isInvalid. if password's don't match, or any important fields are empty
    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (

      //when form submitted, call the onSubmit function
      <form onSubmit={this.onSubmit}>

        {/* input username, vale == to username variable, when changed, call onChange function */}
        <input 
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
          />

        {/* value matches email variable, changes call onChange function */}
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          />

        {/* value = passwordOne variable, changing call onChange function */}
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          />

        {/* Value = passwordTwo variable, changing call onChange function */}
        <input    
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          />

          {/* button to submit hte form. Has disabled properly == isInvalid */}
          <Button variant="contained" disabled={isInvalid} type="submit">Sign Up</Button>

          {/* if there is an error, render it to the screen */}
          {error && <p>{error.message}</p>}

      </form>
    )
    }

}

//define SignUpLink component
const SignUpLink = () => (

  // renders text and a link that routes to the SIGN_UP oath
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// define SignUpForm component. takes SignUpFormBase and wraps it in both withRouter and withFirebase using compose
const SignUpForm = compose(withRouter, withFirebase,)(SignUpFormBase);

//export SignUpPage component
export default SignUpPage;

//export SignUpForm and SignUpLink components
export { SignUpForm, SignUpLink };