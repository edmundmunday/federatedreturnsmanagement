//import React
import React from 'react';

//Import the "withRouter" function
import { withRouter } from 'react-router-dom';

//import the withFirebase function
import { withFirebase } from '../Firebase';

// import the compose function
import { compose } from 'recompose';

//import the context of AuthUser
import AuthUserContext from './context';

//import all the routes
import * as ROUTES from '../../constants/routes';

// define the withAuthorization component, pass in a condition and a component
const withAuthorization = condition => Component => {

  class withAuthorization extends React.Component {
      componentDidMount() {

          // listen for a state change in the Firebase Auth
          this.listener = this.props.firebase.auth.onAuthStateChanged(
              authUser => {

                  // if the condition returns false (user not authorized), push the SIGN_IN path to the router
                  if (!condition(authUser)) {
                      this.props.history.push(ROUTES.SIGN_IN);
                  }
              },
          );
      }

      // not really sure, probably removing the listener when the component is unmounted
      componentWillUnmount() {
          this.listener();
      }

    // init the render methos
    render() {
      return (

        // instantiate the consumer of the AuthUser context
        <AuthUserContext.Consumer>
            {/* pass in the current authUser object */}
            {authUser => 
                
                // if the condition = true, return this.props (which would be the component that was passed in), otherwise return null
                condition(authUser) ? <Component { ...this.props} /> : null
            }
        </AuthUserContext.Consumer>
      );
    }
  }

  // Return the withAuthorization component wrapped inside the "withRouter", function and "withFirebase" function.
  return compose(
      withRouter,
      withFirebase,
  )(withAuthorization);
};

//export that returned component
export default withAuthorization;