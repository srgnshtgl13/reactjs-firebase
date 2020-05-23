import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createFirestoreInstance,getFirestore, reduxFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig';

const initialState = {}
const middleware = [thunk.withExtraArgument({getFirebase,getFirestore})]

const rrfConfig = {
    userProfile: 'users',   // when we register a new user we store the user info(firstname,lastname,initials etc..) in firestore db users collection. So in here we sync the users collection with the user profile
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB. must be included as true or user profile wont be loaded
    // enableClaims: true // Get custom claims along with the profile
}
const store = createStore(rootReducer, initialState, compose(
    reduxFirestore(firebaseConfig),
    applyMiddleware(...middleware),
));


const rrfProps = {
    firebase: firebaseConfig,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }

  
ReactDOM.render(<Provider store={store}> <ReactReduxFirebaseProvider {...rrfProps}><App /></ReactReduxFirebaseProvider> </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
