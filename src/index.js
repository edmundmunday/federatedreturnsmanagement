// React for JSX, React DOM for for UI, not sure what the service worker does
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// import the "app" component
import App from './components/App';

//Import the Firebase context higher order function
import Firebase, { FirebaseContext } from './components/Firebase';
import './index.css';

// init the firebase context and wrap it around the app component
ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,

    // inject it all in to the "root" element from index.html
    document.getElementById('root'),
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
