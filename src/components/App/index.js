import React, { Component } from 'react';

// import the router
import { 
  BrowserRouter as Router,
  Route, Link
 } from 'react-router-dom';

// import the app bar, landing page, signup page, sign in page, password forget page, homepage, account page, admin page components
import AppBar from '../AppBar';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

// import the baseline CSS from material UI
import CssBaseline from '@material-ui/core/CssBaseline';

// import all the routes
import * as ROUTES from '../../constants/routes';

// import the authentication higher order function
import { withAuthentication } from '../Session';

// Define "App"
const App = () => (

  // initiate the router
  <Router>
    {/* initiate the div for the appbar */}
    <div>
      {/* inject the CssBaseline component */}
      <CssBaseline />

      {/* inject the app bar */}
      <AppBar />

      <hr />

      {/* Not sure why the routes are injected here */}
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />

    </div>
  </Router>

);


// export the App wrapped inside the withAuthentication function
export default withAuthentication(App);