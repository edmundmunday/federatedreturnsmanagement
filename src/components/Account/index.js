// import react
import React from 'react';

// import the password forget form and the password change form
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

// import the auth user context and the withAuthorization function
import { AuthUserContext, withAuthorization } from '../Session';

// define the AccountPage component
const AccountPage = () => (

  // instantiate an AuthUserContext consumer
  <AuthUserContext.Consumer>

    {/* pass in the authUser object */}
    {authUser => (
      <div>

        {/* H1 includes the amil attached to authUser */}
        <h1>Account: {authUser.email}</h1>

        {/* inject the PasswordForgetForm */}
        <PasswordForgetForm />

        {/* Inject the PasswordChangeForm */}
        <PasswordChangeForm />
    </div>
    
    )}
  </AuthUserContext.Consumer>

);

// define the condition passed to the withAuthorization function
const condition = authUser => !!authUser;

//export the AccountPage component, wrapped inside the withAuthorization function (+ condition)
export default withAuthorization(condition)(AccountPage);