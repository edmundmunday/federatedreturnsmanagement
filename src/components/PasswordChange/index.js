// import react and "component"
import React, { Component } from 'react';

//import button from material UI
import Button from '@material-ui/core/Button';

// import the withFirebase function
import { withFirebase } from '../Firebase';

//define "INITIAL_STATE" for the form
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

//define tha PasswordChangeFrom class
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    //set it's state to = "INITIAL_STATE"
    this.state = {...INITIAL_STATE};
  }

  //define the onSubmit function - pass it an event
  onSubmit = event => {

    //const { passwordOne } = passwordOne from this.state
    const { passwordOne } = this.state;

    // access firebase from props
    this.props.firebase

    //call the password update method and pass in passwordOne
    .doPasswordUpdate(passwordOne)

    // then revet the state back to "INITIAL_STATE"
    .then(() => {
      this.setState({ ...INITIAL_STATE});
    })

    // if there is an error
    .catch(error => {

      // update this.state with the new error
      this.setState({ error });
    });

    // stop the page from reloading when the process completes
    event.preventDefault();
  };

  // define an onChange function, pass it an event
  onChange = event => {

    //set this.state to the key: value pairs passed to this methos
    this.setState({ [event.target.name]: event.target.value});
  };

  // define the render method
  render() {

    // define a passwordOne, passwordTwo, and error const - based off this.state
    const { passwordOne, passwordTwo, error } = this.state;

    // the isInvalid variable - = true if either password is empty, or the passwords don't match
    const isInvalid = 
      passwordOne === '' ||
      passwordTwo === '' ||
      passwordOne !== passwordTwo;

    return (

      //tell the form to call the onSubmit function when it is submitted
      <form onSubmit={this.onSubmit}>

        {/* new password input, value = this.props.passwordOne */}
        {/* every time the field changes we call the onChange function to update state and re-render the form */}
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

        {/* button to submit the form, has a disabled attribute which is set to the value of the isInvalid function */}
        <Button variant="contained" disabled={isInvalid} type="submit">
          Change My Password
        </Button>

        {/* IF error = true (e.g it exists), show the error message */}
        {error && <p>{error.message}</p>}

      </form>
    );

  }

}

// export the form, wrapped in the withFirebase function
export default withFirebase(PasswordChangeForm);