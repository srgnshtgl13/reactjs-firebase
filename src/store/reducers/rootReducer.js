import {combineReducers} from 'redux';
/**
 * we will use this for auth
 * so what if we sign in or sign out this will update the state and
 * we will change the status accordingly to this state and we will use this in Navbar component
 * if we console.log(state) in any component we will see in firebase object auth object and inside this
 * it has two status that are called isEmpty and isLoaded. isEmpty if it is true then we don't have any profile we had not signed in otherwise we signed in
 */
import { firebaseReducer } from 'react-redux-firebase';
// <- needed if using firestore
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import projectReducer from './projectReducer';


const rootReducer =  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore <- this is responsible for syncing our data
    auth: authReducer,
    project: projectReducer
})

export default rootReducer;