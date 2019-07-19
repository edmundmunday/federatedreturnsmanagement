// import React
import React, { Component } from 'react';

//import withFirebase
import { withFirebase } from '../Firebase';

// define the AdminPage component
class AdminPage extends Component {
  constructor(props) {
    super(props);
      //set this.state with a loading value and an empty users array
      this.state = {
        loading: false,
        users: [],
      };
  }

  //when the component mounts
  componentDidMount() {

    //set loading to true
    this.setState({ loading: true,});

    //set a listener on the Firebase db, targetted at the users entitu. passes in string ' value
    this.props.firebase.users().on('value', snapshot => {

      //define usersObject which is the response from the listener
      const usersObject = snapshot.val();

      //define usersList array. Get an array of keys: from usersObject
      const usersList = Object.keys(usersObject)

      //perform .map on that array, passing in each key and operating on the usersObject using key as an index
      .map(key => ({
        ...usersObject[key],
      }));
      
      // set this.state to make users: = the usersList array and loading to false
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  // when the component unmounts
  componentWillUnmount() {

    //deactivate the listener
    this.props.firebase.users().off();
  }

  //define the render method
  render() {

    //define consts users, and loading - matching this.state
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {/* if loading = true, display a loading message */}
        { loading && <div>Loading...</div>}

        {/* inject UserList component and passin {users} as props */}
        <UserList users={users} />
      </div>
    );
  }
}

//define UserList component - that takes users as props
const UserList = ({ users }) => (
  <ul>

    {/* map users object - pass in a user */}
    {users.map(user => (

      {/* render a list item with key = user.uid */},
      <li key={user.uid}>

        {/* render a span containing user.uid */}
        <span>
          <strong>ID:</strong> {user.uid}
        </span>

        {/* render a span containing user.email */}
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>

        {/* render a span containing user.email */}
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

// export AdminPage wrapped inside withFirebase
export default withFirebase(AdminPage);