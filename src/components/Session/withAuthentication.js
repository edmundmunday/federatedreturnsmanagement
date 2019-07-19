// import React
import React from 'react';

// import the AuthUser context
import AuthUserContext from './context';

// import the withFirebase function
import { withFirebase } from '../Firebase';

// init the withAuthentication component
const withAuthentication = Component => {

    // create a withAuthentication class
    class WithAuthentication extends React.Component {

        //pass its props to the constructor
        constructor(props) {
            super(props);

            //set the state of authUser to null
            this.state = {
                authUser: null,
            };
        }

        //when the component mounts
        componentDidMount() {
            //listen to the onAuthStateChanged method from Firebase
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {

                    // if authUser = true
                    authUser ?

                        // setState class state of authUser to match the clients authUser
                        this.setState({ authUser }) :

                        // otherwise, set the class state of authUser to null
                        this.setState({ authUser: null });
                },
            );
        }

        //not sure - probably removing the listener when the component is unmounted
        componentWillUnmount() {
            this.listener();
        }

        // init the render method
        render() {
            return(

            //initiate the authUser context provider, pass in the class state for authUser
            <AuthUserContext.Provider value={this.state.authUser}>

                {/* render a component equal to the props passed in. e.g. if authUser state = null, so will the component. */}
                <Component {...this.props} />
            </AuthUserContext.Provider>
            );
        }
    }

    // return the output of the class, wrapped in the Firebase function
    return withFirebase(WithAuthentication);
};

// export the withAuthentication component
export default withAuthentication;