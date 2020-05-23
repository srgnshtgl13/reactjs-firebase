import {SIGNIN_SUCCESS, SIGNIN_ERROR, 
        SIGNOUT_SUCCESS, CLEAR_SIGNING_ERRORS, 
        SIGNUP_SUCCESS,SIGNUP_ERROR,PRESS_BUTTON
    } from './types';

export const SignInAction = (credentials) => (dispatch,getState,{getFirebase}) => {
    dispatch({ type:PRESS_BUTTON });

    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
    ).then(()=>{
        dispatch({ type:SIGNIN_SUCCESS });
    }).catch(err=>{
        dispatch({ type:SIGNIN_ERROR, payload:err.message });
    });
}

export const SignOutAction = () => (dispatch,getState,{getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
        .then(()=>{
            dispatch({type:SIGNOUT_SUCCESS});
        });

}

export const ClearSigningErrorsAction = () => {
    return {type: CLEAR_SIGNING_ERRORS};
}

/**
 * we will use the getFirebase to signup the new user and
 * when we create a new user the auth service will hold the data that are about the user then 
 * we will use the getFirestore save the user credentials inside the users table(or collection)
 * the user uid which one the auth service will create will be the document in the users firestore collection
 * @param {*} newUser 
 */
export const SignUpAction = (newUser) => (dispatch,getState,{getFirebase,getFirestore}) => {
    dispatch({ type:PRESS_BUTTON });
    const firebase = getFirebase();
    const firestore = getFirestore();
    // manually email validation
    // if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email))){
    //     return dispatch({type:SIGNUP_ERROR, err: "Email is invalid!"})
    // }

    if(newUser.email==="" || newUser.firstName==="" || newUser.lastName==="" || newUser.password===""){
        return dispatch({type:SIGNUP_ERROR, err: "Blank field/fields error!"})
    } else {

        //create the user
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
            )
            //store this user inside the firestore database
                .then((res)=>{
                    return firestore.collection('users').doc(res.user.uid).set({
                        firstName:newUser.firstName,
                        lastName:newUser.lastName,
                        initials: newUser.firstName[0]+newUser.lastName[0]
                    })
            
                })
                // then if the processes above be successfull then return a dispatch type
                .then(()=>{
                    dispatch({type:SIGNUP_SUCCESS})
                })
                .catch((err)=>{
                    dispatch({type:SIGNUP_ERROR, err:err.message})
                })
    }


}